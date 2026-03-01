import os
import django
import sys

# Add the backend directory to the sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'milkman_core.settings')
django.setup()

from apps.products.models import Category, Product
from apps.accounts.models import User

def seed():
    # Create Categories with descriptions
    categories_data = [
        {'name': 'Milk', 'description': 'The elixir of life. Fresh, pure, and delivered with love every morning.'},
        {'name': 'Ghee', 'description': 'Traditional purity in every drop. The golden essence of Indian heritage.'},
        {'name': 'Butter', 'description': 'Creamy, rich, and utterly delicious. The soul of every breakfast.'},
        {'name': 'Dahi', 'description': 'Nature’s probiotic miracle. Thick, creamy, and naturally set.'},
        {'name': 'Paneer', 'description': 'Soft, fresh, and versatile cottage cheese. Perfect for all your culinary adventures.'}
    ]

    cat_objs = {}
    for cat in categories_data:
        obj, _ = Category.objects.get_or_create(name=cat['name'], defaults={'description': cat['description']})
        cat_objs[cat['name']] = obj

    # Create Products with ultra-high-quality images and persuasive descriptions
    products = [
        {
            'name': 'Pure Cow Milk (A2)', 
            'category': 'Milk', 
            'price': 68.00, 
            'description': 'Experience the gold standard of health! Our A2 Cow Milk is sourced from the finest local breeds, ensuring easy digestion and a taste that reminds you of childhood farms. Freshly milked and delivered within hours.',
            'image_url': 'https://images.pexels.com/photos/3735192/pexels-photo-3735192.jpeg' # Unique milk image
        },
        {
            'name': 'Royal Buffalo Milk', 
            'category': 'Milk', 
            'price': 82.00, 
            'description': 'Indulge in the richness of Royal Buffalo Milk. With its high cream content and thick consistency, it’s the secret ingredient for the most satisfying tea, coffee, and traditional Indian sweets. Naturally nutritious and absolutely pure.',
            'image_url': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' # Unique milk image
        },
        {
            'name': 'Desi Bilona Cow Ghee', 
            'category': 'Ghee', 
            'price': 750.00, 
            'description': 'Liquid Gold! Crafted using the ancient Bilona method (churning curd with wooden churner), this ghee is aromatic, granular, and packed with health benefits. It doesn’t just add flavor; it adds life to your meals.',
            'image_url': 'https://media.istockphoto.com/id/1413268611/photo/ghee-butter-oil.jpg?s=2048x2048&w=is&k=20&c=K18ttyAf75d02uDCoKWe7R8-AleXS-BxsvsRqthxRbA=' # Unique ghee image
        },
        {
            'name': 'Artisanal White Butter', 
            'category': 'Butter', 
            'price': 120.00, 
            'description': 'Salt-free, fresh, and hand-churned. Our Artisanal White Butter (Makhan) is exactly how your grandmother used to make it. Perfect for hot parathas and adding a dollop of love to your food.',
            'image_url': 'https://media.istockphoto.com/id/964588142/vector/vector-butter-icon.jpg?s=2048x2048&w=is&k=20&c=k56sdOGQ8kj4FOSScPdLkk1t-ubmarjnuxGEaU13nCA=' # Unique butter image
        },
        {
            'name': 'Thick Probiotic Dahi', 
            'category': 'Dahi', 
            'price': 48.00, 
            'description': 'The perfect accompaniment to every meal. Our Dahi is naturally set and thick, containing active probiotic cultures that boost immunity and digestion. It’s not just curd; it’s a bowl of health.',
            'image_url': 'https://media.istockphoto.com/id/154961206/photo/white-ceramic-bowl-of-yogurt-on-a-wooden-table.jpg?s=2048x2048&w=is&k=20&c=dexfw2UdJdDD3T7DXz7pLpHDOMZztAYPFUEqb3kasI0=' # Unique dahi image
        },
        {
            'name': 'Premium Paneer (Cottage Cheese)', 
            'category': 'Paneer', 
            'price': 150.00, 
            'description': 'Soft as a cloud! Our Paneer is freshly made and incredibly tender. It absorbs flavors beautifully, making your palak paneer or paneer tikka a legendary experience.',
            'image_url': 'https://images.pexels.com/photos/7368035/pexels-photo-7368035.jpeg' # Unique paneer image
        },
        {
            'name': 'Low Fat Skimmed Milk (1L)', 
            'category': 'Milk', 
            'price': 58.00, 
            'description': 'Perfect for fitness enthusiasts, zero fat milk, without compromising on taste. Ideal for a healthy lifestyle.',
            'image_url': 'https://media.istockphoto.com/id/1222018207/photo/pouring-milk-into-a-drinking-glass.jpg?s=2048x2048&w=is&k=20&c=R64Zq4StME49bdclVaoywxEz0jyIxz9Qx--uZdaEY4g=' # Unique milk image
        }
    ]

    Product.objects.all().delete()
    print("Refreshing product catalog...")

    for prod in products:
        Product.objects.create(
            name=prod['name'],
            category=cat_objs[prod['category']],
            price=prod['price'], 
            description=prod['description'],
            image_url=prod['image_url']
        )
        print(f"Product Added: {prod['name']}")

if __name__ == '__main__':
    seed()
