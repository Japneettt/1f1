require("dotenv").config();
const { sequelize, Product, Variant, EmiPlan } = require("../models/index");

const productsData = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    brand: "Apple",
    description: "The most advanced iPhone yet, with a powerful camera system and all-day battery life.",
    specs: {
      "Front Camera": "18MP",
      "Rear Camera": "48MP + 48MP + 48MP",
      "Screen Size": "6.3 inch",
      "Screen Resolution": "2622 x 1206 Pixels",
      "Battery": "Up to 33 hours video playback",
      "Processor": "A19 Pro chip"
    },
    variants: [
      {
        variantSlug: "256gb-orange",
        storage: "256GB",
        color: "Orange",
        mrp: 134900,
        price: 127400,
        image: "/iphone17_orange.webp",
        emiPlans: [
          { tenureMonths: 3, monthlyAmount: 44967, interestRate: 0, cashback: 7500 },
          { tenureMonths: 6, monthlyAmount: 22483, interestRate: 0, cashback: 7500 },
          { tenureMonths: 12, monthlyAmount: 11242, interestRate: 0, cashback: 7500 },
          { tenureMonths: 24, monthlyAmount: 5621, interestRate: 0, cashback: 7500 },
          { tenureMonths: 36, monthlyAmount: 4297, interestRate: 10.5, cashback: 7500 },
          { tenureMonths: 48, monthlyAmount: 3385, interestRate: 10.5, cashback: 7500 },
          { tenureMonths: 60, monthlyAmount: 2842, interestRate: 10.5, cashback: 7500 }
        ]
      },
      {
        variantSlug: "256gb-silver",
        storage: "256GB",
        color: "Silver",
        mrp: 134900,
        price: 127400,
        image: "/iphone17black.webp",
        emiPlans: [
          { tenureMonths: 3, monthlyAmount: 44967, interestRate: 0, cashback: 7500 },
          { tenureMonths: 6, monthlyAmount: 22483, interestRate: 0, cashback: 7500 },
          { tenureMonths: 12, monthlyAmount: 11242, interestRate: 0, cashback: 7500 }
        ]
      }
    ]
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    brand: "Samsung",
    description: "Flagship Android phone with S Pen support and a 200MP camera.",
    specs: {
      "Front Camera": "12MP",
      "Rear Camera": "200MP + 12MP + 10MP + 50MP",
      "Screen Size": "6.8 inch",
      "Screen Resolution": "3120 x 1440 Pixels",
      "Battery": "5000 mAh",
      "Processor": "Snapdragon 8 Gen 3"
    },
    variants: [
      {
        variantSlug: "256gb-black",
        storage: "256GB",
        color: "Titanium Black",
        mrp: 129999,
        price: 119999,
        image: "/samsungblack.webp",
        emiPlans: [
          { tenureMonths: 3, monthlyAmount: 40000, interestRate: 0, cashback: 5000 },
          { tenureMonths: 6, monthlyAmount: 20500, interestRate: 0, cashback: 5000 },
          { tenureMonths: 12, monthlyAmount: 10500, interestRate: 0, cashback: 5000 }
        ]
      },
      {
        variantSlug: "512gb-gray",
        storage: "512GB",
        color: "Titanium Gray",
        mrp: 139999,
        price: 129999,
        image: "/samsunggrey.webp",
        emiPlans: [
          { tenureMonths: 3, monthlyAmount: 43333, interestRate: 0, cashback: 5000 },
          { tenureMonths: 12, monthlyAmount: 11400, interestRate: 0, cashback: 5000 }
        ]
      }
    ]
  },
  {
    name: "OnePlus 12",
    slug: "oneplus-12",
    brand: "OnePlus",
    description: "Flagship killer with Hasselblad camera and 100W fast charging.",
    specs: {
      "Front Camera": "32MP",
      "Rear Camera": "50MP + 64MP + 48MP",
      "Screen Size": "6.82 inch",
      "Screen Resolution": "3168 x 1440 Pixels",
      "Battery": "5400 mAh",
      "Processor": "Snapdragon 8 Gen 3"
    },
    variants: [
      {
        variantSlug: "256gb-emerald",
        storage: "256GB",
        color: "Flowy Emerald",
        mrp: 69999,
        price: 64999,
        image: "/oneplusemerald.jpg",
        emiPlans: [
          { tenureMonths: 3, monthlyAmount: 21666, interestRate: 0, cashback: 2000 },
          { tenureMonths: 6, monthlyAmount: 11166, interestRate: 0, cashback: 2000 },
          { tenureMonths: 12, monthlyAmount: 5833, interestRate: 0, cashback: 2000 }
        ]
      },
      {
        variantSlug: "512gb-black",
        storage: "512GB",
        color: "Silky Black",
        mrp: 74999,
        price: 69999,
        image: "/oneplus12black.webp",
        emiPlans: [
          { tenureMonths: 3, monthlyAmount: 23333, interestRate: 0, cashback: 2000 },
          { tenureMonths: 12, monthlyAmount: 6300, interestRate: 0, cashback: 2000 }
        ]
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables recreated");

    for (const productData of productsData) {
      const { variants, ...productFields } = productData;
      const product = await Product.create(productFields);

      for (const variantData of variants) {
        const { emiPlans, ...variantFields } = variantData;
        const variant = await Variant.create({
          ...variantFields,
          productId: product.id
        });

        for (const plan of emiPlans) {
          await EmiPlan.create({
            ...plan,
            variantId: variant.id
          });
        }
      }
    }

    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDatabase();