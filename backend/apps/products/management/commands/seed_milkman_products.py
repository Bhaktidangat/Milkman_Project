from django.core.management.base import BaseCommand
from apps.products.models import Category, Product

PRODUCTS = [
    {
        "name": "Buttermilk",
        "price": 50,
        "image_url": "https://consumer-voice.org/wp-content/uploads/2023/04/Buttermilk-A-Refreshing-Summer-Drink.jpg",
        "description": "Refreshing traditional buttermilk, perfect for summer.",
        "category": "Beverages",
    },
    {
        "name": "Lassi",
        "price": 60,
        "image_url": "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTEwL3Jhd3BpeGVsb2ZmaWNlNF9waG90b19vZl9sYXNzaV9pbmRpYW5fZGVzc2VydF9tZW51X2lzb2xhdGVkX29uX18yOTBmYTZmNS1kYjJiLTQ4NTYtODMxMi04ODliZjczZDUyNDkucG5n.png",
        "description": "Sweet and creamy yogurt-based drink.",
        "category": "Beverages",
    },
    {
        "name": "Ice Cream",
        "price": 30,
        "image_url": "https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg",
        "description": "Delicious, rich ice cream scoops.",
        "category": "Desserts",
    },
    {
        "name": "Goat Milk (1L)",
        "price": 90,
        "image_url": "https://5.imimg.com/data5/SELLER/Default/2025/6/523186518/FF/JK/UW/244938597/fresh-goat-milk.jpg",
        "description": "Fresh goat milk rich in nutrients.",
        "category": "Milk",
    },
]


class Command(BaseCommand):
    help = "Seeds Milkman demo products into the database if they don't exist"

    def handle(self, *args, **options):
        created_count = 0
        for data in PRODUCTS:
            category_name = data["category"]
            category, _ = Category.objects.get_or_create(
                name=category_name, 
                defaults={"description": f"All items related to {category_name}"}
            )
            
            product, created = Product.objects.get_or_create(
                name=data["name"],
                defaults={
                    "category": category,
                    "description": data["description"],
                    "image_url": data["image_url"],
                    "price": data["price"],
                    "is_available": True,
                },
            )
            if not created:
                # Ensure fields are up-to-date
                product.category = category
                product.description = data["description"]
                product.image_url = data["image_url"]
                product.price = data["price"]
                product.is_available = True
                product.save()
            else:
                created_count += 1

        self.stdout.write(self.style.SUCCESS(f"Seeding complete. Created/Updated {len(PRODUCTS)} products."))

