from django.core.management.base import BaseCommand
from decouple import config

from products.models import Category, Product, ProductImage

# Base URL for the packaged product images. Defaults to the public Supabase
# storage bucket that the storefront already serves these same files from, so
# seeded products render correctly in production. Override with PRODUCT_MEDIA_BASE_URL
# (e.g. http://localhost:8000/media/products/) for local development.
MEDIA_BASE = config(
    'PRODUCT_MEDIA_BASE_URL',
    default='https://fcftzqaitfmvxmjbhpvp.supabase.co/storage/v1/object/public/product-images/',
)


def local(filename):
    return MEDIA_BASE + filename


CATEGORY_PRODUCTS = {
    'Toy Cars': [
        ('Die-cast Drift Car', 299, 'A collectible die-cast drift-style toy car.',
         'https://images.unsplash.com/photo-1758964087156-0eac97044f84?auto=format&fit=crop&w=800&q=80'),
        ('Kids Canopy Tricycle', 2999, 'A pedal tricycle with a sun canopy and parent push handle.',
         local('baby-canopy-tricycle.png')),
    ],
    'Battery Operated Toy Cars': [
        ('Battery Operated Rock Crawler Truck', 899, 'A battery operated off-road truck with working suspension.',
         'https://images.unsplash.com/photo-1519314069741-9f69a9daddfa?auto=format&fit=crop&w=800&q=80'),
        ('Battery Operated Ride-on Motorbike', 4999, 'A battery operated ride-on motorbike for kids.',
         local('kids-ride-on-motorbike.png')),
    ],
    'Photo Frames': [
        ('Adjustable Photo Frame Set', 599, 'A set of adjustable-size picture frames for tabletop display.',
         'https://images.unsplash.com/photo-1650562755474-63a9b8e3fb19?auto=format&fit=crop&w=800&q=80'),
    ],
    'Water Bottles': [
        ('Kids Cartoon Water Bottle', 199, 'A leak-proof water bottle with a fun cartoon design.',
         'https://images.unsplash.com/photo-1612436807983-75383e83cb7c?auto=format&fit=crop&w=800&q=80'),
    ],
    'Toys & Novelties': [
        ('Chhota Bheem Kung Fu Bheem Action Plush - 35cm', 499,
         'A 35cm soft plush action figure, a store favorite.',
         'https://images.unsplash.com/photo-1546450985-dda6db4b7ec2?auto=format&fit=crop&w=800&q=80'),
        ('Chhota Bheem Jaggu Plush Toy (Multicolor)', 449,
         'A colorful multicolor plush toy for kids.',
         'https://images.unsplash.com/photo-1584155828260-3791b07e6afb?auto=format&fit=crop&w=800&q=80'),
        ('Chhota Bheem Dholu Plush Toy (33cm) Multi Color', 449,
         'A 33cm multi-color plush toy, soft and huggable.',
         'https://images.unsplash.com/photo-1591926828257-2eefb8aa42fa?auto=format&fit=crop&w=800&q=80'),
        ('Kitchen Chef Set', 599, 'A pretend-play kitchen chef set with utensils and cookware.',
         local('kitchen-chef-set.png')),
        ('Advanced Kitchenware Play Set', 499, 'A smell-chef kitchenware play set with cookware and utensils.',
         local('advanced-kitchenware-set.png')),
        ('Crawling Baby Toy', 399, 'A battery operated crawling baby doll toy.',
         local('crawling-baby-toy.png')),
        ('Large Plush Tiger', 1299, 'A large soft plush tiger, lifelike and huggable.',
         local('plush-tiger-large.png')),
        ('Plush Tiger Family Set', 2499, 'A set of plush tigers in varying sizes.',
         local('plush-tiger-family-set.png')),
        ('Minnie Mouse Plush Doll Set', 899, 'A pair of soft plush dolls in dresses.',
         local('minnie-mickey-plush-set.png')),
        ('Frozen Anna & Elsa Doll Set', 599, 'A fashion doll set with matching snowman figure.',
         local('frozen-anna-elsa-doll-set.png')),
        ('Minion Plush Toy Set', 799, 'A pair of soft Minion plush toys, large and small.',
         local('minion-plush-set.png')),
        ('Dora the Explorer Plush Set', 699, 'A pair of Dora plush dolls holding star toys.',
         local('dora-plush-set.png')),
        ('Winnie the Pooh Plush Set', 999, 'A set of soft Winnie the Pooh plush bears, three sizes.',
         local('winnie-pooh-plush-set.png')),
    ],
    'Idols & Showpieces': [
        ('White & Gold Elephant Statue', 1500, 'A hand-painted decorative elephant statue.',
         local('white-gold-elephant-statue.png')),
        ('Baby Krishna Idol', 899, 'A painted resin idol of baby Krishna.',
         local('baby-krishna-idol.png')),
        ('Swami Vivekananda Statue', 1299, 'A painted statue of Swami Vivekananda.',
         local('swami-vivekananda-statue.png')),
        ('Shivaji Maharaj Statue', 999, 'A black stone-finish statue of Chhatrapati Shivaji Maharaj.',
         local('shivaji-maharaj-statue.png')),
        ('Krishna with Flute Idol', 1899, 'A tall painted idol of Krishna playing the flute.',
         local('krishna-flute-idol.png')),
        ('Decorative Bird Showpiece', 649, 'A decorative bird-on-branch showpiece for tabletop display.',
         local('decorative-bird-showpiece.png')),
        ('LED Temple Model', 2499, 'A laser-cut wooden temple model with built-in LED lighting.',
         local('led-ram-mandir-model.png')),
    ],
    'Occasions': [
        ('Occasion Gift Box', 999, 'A curated box for any celebration.',
         'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'),
    ],
    'Anniversary': [
        ('Anniversary Rose Bouquet', 1299, 'Fresh roses to celebrate another year of love.',
         'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80'),
    ],
    'Flowers': [
        ('Fresh Flower Bouquet', 599, 'A hand-tied bouquet of seasonal flowers.',
         'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80'),
        ('Lily Bunch', 649, 'Elegant white lilies, freshly cut.',
         'https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=800&q=80'),
    ],
    'Personalised': [
        ('Color Changing Photo Mug', 399, 'A magic mug that reveals your photo in color when filled with hot liquid.',
         local('color-changing-photo-mug.png')),
        ('Engraved Keychain', 299, 'A keychain engraved with a name or initials.',
         'https://images.unsplash.com/photo-1727154085760-134cc942246e?auto=format&fit=crop&w=800&q=80'),
        ('3D Crystal Photo Heart', 1299, 'A heart-shaped crystal block laser-engraved with your photo, on an LED base.',
         local('3d-crystal-photo-heart.png')),
        ('3D Crystal Photo Carving', 1499, 'A freeform crystal block laser-engraved with your photo, on an LED base.',
         local('3d-crystal-photo-carving.png')),
        ('Custom Bust Statue', 2999, 'A hand-painted bust statue crafted from your photo.',
         local('custom-bust-statue.png')),
        ('Pencil Portrait Sketch', 799, 'A framed hand-drawn pencil portrait made from your photo.',
         local('pencil-portrait-sketch.png')),
        ('Custom Name Plate', 899, 'A laser-cut personalized name plate for home or office.',
         local('custom-name-plate.png')),
        ('Printed Kids T-Shirt', 349, 'A printed cotton t-shirt with a fun cartoon design.',
         local('minion-kids-tshirt.png')),
    ],
    'Plants': [
        ('Succulent Trio', 399, 'Three low-maintenance succulents in ceramic pots.',
         'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80'),
        ('Money Plant', 349, 'A money plant in a decorative planter, said to bring luck.',
         'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=800&q=80'),
    ],
    'Lifestyle': [
        ('Scented Candle Set', 499, 'A set of three scented soy candles.',
         'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80'),
        ('Mr & Mrs 3D LED Lamp', 799, 'A 3D illusion LED lamp with color-changing light, a wedding gift favorite.',
         local('mr-mrs-led-lamp.png')),
        ('LOVE 3D LED Lamp', 799, 'A heart-shaped 3D illusion LED lamp with color-changing light.',
         local('love-led-lamp.png')),
        ('3D LED Proposal Heart Lamp', 899, 'A crystal-studded heart lamp with a proposal figurine.',
         local('led-proposal-heart-lamp.png')),
        ('3D LED Rocket Lamp', 699, 'A decorative 3D illusion lamp on a rocket-shaped stand.',
         local('3d-led-rocket-lamp.png')),
    ],
    'LUXE': [
        ('Premium Gift Hamper', 2499, 'A luxury hamper with gourmet treats and a keepsake box.',
         'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'),
    ],
    'Hampers': [
        ('Gourmet Snack Hamper', 1199, 'A hamper packed with gourmet snacks and treats.',
         'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80'),
    ],
}


class Command(BaseCommand):
    help = 'Seed categories and sample products for the storefront nav sections.'

    def handle(self, *args, **options):
        created_categories = 0
        created_products = 0

        for category_name, products in CATEGORY_PRODUCTS.items():
            category, was_created = Category.objects.get_or_create(name=category_name)
            created_categories += int(was_created)

            for name, price, description, image_url in products:
                sku = f'{category.slug}-{name}'.lower().replace(' ', '-')[:64]
                product, was_created = Product.objects.get_or_create(
                    sku=sku,
                    defaults={
                        'category': category,
                        'name': name,
                        'description': description,
                        'price': price,
                        'stock_quantity': 25,
                    },
                )
                created_products += int(was_created)
                if was_created:
                    ProductImage.objects.create(
                        product=product, image_url=image_url, is_primary=True,
                    )

        self.stdout.write(self.style.SUCCESS(
            f'Seeded {created_categories} new categories and {created_products} new products.'
        ))
