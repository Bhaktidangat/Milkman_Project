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
    # Create Categories with better images
    categories = [
        {
            'name': 'Milk', 
            'description': 'Fresh farm milk, pure and nutritious.',
        },
        {
            'name': 'Ghee', 
            'description': 'Pure desi ghee made from traditional methods.',
        },
        {
            'name': 'Butter', 
            'description': 'Creamy and delicious table butter.',
        },
        {
            'name': 'Dahi', 
            'description': 'Fresh, thick and natural curd.',
        }
    ]

    cat_objs = {}
    for cat in categories:
        obj, created = Category.objects.get_or_create(
            name=cat['name'], 
            defaults={
                'description': cat['description']
            }
        )
        cat_objs[cat['name']] = obj

    # Create Products with high-quality Unsplash images
    products = [
        {
            'name': 'Fresh Cow Milk (1L)', 
            'category': 'Milk', 
            'price': 64.00, 
            'description': 'Naturally sourced cow milk, pasteurized and chilled.',
            'image_url': 'https://images.unsplash.com/photo-1563636619-e9107da5a76a?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Creamy Buffalo Milk (1L)', 
            'category': 'Milk', 
            'price': 78.00, 
            'description': 'Rich and thick buffalo milk, perfect for tea and coffee.',
            'image_url': 'https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Pure Desi Cow Ghee (500ml)', 
            'category': 'Ghee', 
            'price': 650.00, 
            'description': 'Traditional bilona method ghee, aromatic and healthy.',
            'image_url': 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Premium Buffalo Ghee (500ml)', 
            'category': 'Ghee', 
            'price': 580.00, 
            'description': 'Granular texture and rich aroma buffalo ghee.',
            'image_url': 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Salted Table Butter (100g)', 
            'category': 'Butter', 
            'price': 52.00, 
            'description': 'Classic salted butter for your daily breakfast.',
            'image_url': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Farm Fresh Dahi (400g)', 
            'category': 'Dahi', 
            'price': 45.00, 
            'description': 'Probiotic rich, thick and set curd.',
            'image_url': 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Low Fat Skimmed Milk (1L)', 
            'category': 'Milk', 
            'price': 58.00, 
            'description': 'Perfect for fitness enthusiasts, zero fat milk.',
            'image_url': 'https://images.unsplash.com/photo-1550583724-125581f77833?auto=format&fit=crop&q=80&w=800'
        }
    ]

    # Delete existing products to re-seed with images
    Product.objects.all().delete()
    print("Old products deleted. Seeding new products with images...")

    for prod in products:
        Product.objects.create(
            name=prod['name'],
            category=cat_objs[prod['category']],
            price=prod['price'], 
            description=prod['description'],
            image_url=prod['image_url']
        )
        print(f"Product created: {prod['name']}")

if __name__ == '__main__':
    seed()
