export type MenuCategory =
  | "Signature"
  | "Espresso Based"
  | "Refreshers Espresso"
  | "Filter Coffee"
  | "Cold Brew"
  | "Sweet & Milky"
  | "Matcha"
  | "Mocktail"
  | "Refreshers Tea"
  | "Frappe"
  | "Main Dishes"
  | "Nasi Goreng"
  | "Toast"
  | "Light Bites"
  | "Breakfast"
  | "Dessert"
  | "Rasa Lokal";

export const MENU_CATEGORIES: MenuCategory[] = [
  "Signature",
  "Espresso Based",
  "Refreshers Espresso",
  "Filter Coffee",
  "Cold Brew",
  "Sweet & Milky",
  "Matcha",
  "Mocktail",
  "Refreshers Tea",
  "Frappe",
  "Main Dishes",
  "Nasi Goreng",
  "Toast",
  "Light Bites",
  "Breakfast",
  "Dessert",
  "Rasa Lokal",
];

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description?: string;
  variantNote?: string;
  availability?: string;
  signature?: boolean;
  spicy?: boolean;
  hotPrice?: number;
  icePrice?: number;
};

export function formatCurrency(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export const MENU: MenuItem[] = [
  // ---------- Signature ----------
  {
    id: "es-kopi-memory",
    category: "Signature",
    name: "Es Kopi Memory",
    signature: true,
    icePrice: 25000,
  },
  {
    id: "memory-on-the-rock",
    category: "Signature",
    name: "Memory on the Rock",
    description:
      "Signature dingin kami — espresso dituang perlahan di atas es, dibiarkan mengendap rasanya.",
    icePrice: 25000,
  },
  {
    id: "dolce-latte",
    category: "Signature",
    name: "Dolce Latte",
    hotPrice: 18000,
    icePrice: 20000,
  },
  {
    id: "butterscotch-latte",
    category: "Signature",
    name: "Butterscotch Latte",
    hotPrice: 28000,
    icePrice: 30000,
  },
  {
    id: "caramel-macchiato",
    category: "Signature",
    name: "Caramel Macchiato",
    hotPrice: 28000,
    icePrice: 30000,
  },

  // ---------- Espresso Based ----------
  { id: "espresso", category: "Espresso Based", name: "Espresso", hotPrice: 22000 },
  {
    id: "americano",
    category: "Espresso Based",
    name: "Americano",
    hotPrice: 23000,
    icePrice: 25000,
  },
  {
    id: "pinecano",
    category: "Espresso Based",
    name: "Pinecano",
    description:
      "Kombinasi espresso bold dengan manis-asam nanas segar dan soda berkilau.",
    icePrice: 30000,
  },
  {
    id: "peachcano",
    category: "Espresso Based",
    name: "Peachcano",
    description:
      "Perpaduan espresso aromatik dengan rasa peach yang manis-fruity dan sentuhan soda yang sparkling. Rasanya cerah, crisp, dan menyegarkan.",
    icePrice: 30000,
  },
  { id: "magic", category: "Espresso Based", name: "Magic", hotPrice: 30000 },
  {
    id: "cappuccino",
    category: "Espresso Based",
    name: "Cappuccino",
    hotPrice: 28000,
    icePrice: 30000,
  },
  { id: "piccolo", category: "Espresso Based", name: "Piccolo", hotPrice: 25000 },
  { id: "affogato", category: "Espresso Based", name: "Affogato", icePrice: 25000 },
  {
    id: "ice-cube-memory",
    category: "Espresso Based",
    name: "Ice Cube Memory",
    icePrice: 25000,
  },
  {
    id: "salty-hazelnut-creme",
    category: "Espresso Based",
    name: "Salty Hazelnut Creme",
    icePrice: 30000,
  },
  {
    id: "flavored-latte",
    category: "Espresso Based",
    name: "Flavored Latte",
    variantNote: "Vanilla / Caramel / Hazelnut",
    hotPrice: 30000,
    icePrice: 32000,
  },
  {
    id: "cafe-latte",
    category: "Espresso Based",
    name: "Cafe Latte",
    hotPrice: 28000,
    icePrice: 30000,
  },
  {
    id: "mocca-latte",
    category: "Espresso Based",
    name: "Mocca Latte",
    hotPrice: 28000,
    icePrice: 30000,
  },
  {
    id: "klepon-coffee",
    category: "Espresso Based",
    name: "Klepon Coffee",
    signature: true,
    hotPrice: 30000,
    icePrice: 32000,
  },
  {
    id: "pandan-coffee",
    category: "Espresso Based",
    name: "Pandan Coffee",
    hotPrice: 28000,
    icePrice: 30000,
  },
  {
    id: "seasalt-latte",
    category: "Espresso Based",
    name: "Seasalt Latte",
    hotPrice: 28000,
    icePrice: 30000,
  },
  {
    id: "butterscotch-seasalt-latte",
    category: "Espresso Based",
    name: "Butterscotch Seasalt Latte",
    icePrice: 32000,
  },
  {
    id: "creme-brulee",
    category: "Espresso Based",
    name: "Creme Brulee",
    hotPrice: 28000,
    icePrice: 30000,
  },

  // ---------- Refreshers Espresso ----------
  {
    id: "espresso-tonic",
    category: "Refreshers Espresso",
    name: "Espresso Tonic",
    icePrice: 27000,
  },
  {
    id: "mangopresso-squash",
    category: "Refreshers Espresso",
    name: "Mangopresso Squash",
    signature: true,
    icePrice: 27000,
  },

  // ---------- Filter Coffee ----------
  {
    id: "filter-coffee-tier-1",
    category: "Filter Coffee",
    name: "Filter Coffee (Tier 1)",
    variantNote: "V60 / Japanese / Tricolate Brewer",
    hotPrice: 25000,
  },
  {
    id: "filter-coffee-tier-2",
    category: "Filter Coffee",
    name: "Filter Coffee (Tier 2)",
    variantNote: "V60 / Japanese / Tricolate Brewer",
    hotPrice: 30000,
  },
  {
    id: "filter-coffee-tier-3",
    category: "Filter Coffee",
    name: "Filter Coffee (Tier 3)",
    variantNote: "V60 / Japanese / Tricolate Brewer",
    hotPrice: 40000,
  },
  { id: "kopi-tubruk", category: "Filter Coffee", name: "Kopi Tubruk", hotPrice: 22000 },
  { id: "vietnam-drip", category: "Filter Coffee", name: "Vietnam Drip", hotPrice: 22000 },

  // ---------- Cold Brew ----------
  {
    id: "cold-brew-black",
    category: "Cold Brew",
    name: "Cold Brew Black (250ml)",
    description:
      "No sugar, no cream — just 100% Arabica speaking for itself. Smooth, strong, dan refreshingly bold untuk yang suka kopi bersih dan jujur.",
    icePrice: 35000,
  },
  {
    id: "cold-brew-white",
    category: "Cold Brew",
    name: "Cold Brew White (250ml)",
    description:
      "Mellow tapi rich, smooth tapi full-bodied. Lapisan creamy melembutkan tanpa menghilangkan kompleksitas kopinya.",
    icePrice: 35000,
  },

  // ---------- Sweet & Milky ----------
  {
    id: "flavoured-steam-milk",
    category: "Sweet & Milky",
    name: "Flavoured Steam Milk",
    variantNote: "Vanilla / Caramel / Hazelnut",
    hotPrice: 22000,
    icePrice: 24000,
  },
  {
    id: "caramel-chocolate",
    category: "Sweet & Milky",
    name: "Caramel Chocolate",
    hotPrice: 27000,
    icePrice: 29000,
  },
  {
    id: "hazelnut-chocolate",
    category: "Sweet & Milky",
    name: "Hazelnut Chocolate",
    hotPrice: 27000,
    icePrice: 29000,
  },
  {
    id: "chocolate-signature",
    category: "Sweet & Milky",
    name: "Chocolate Signature",
    hotPrice: 23000,
    icePrice: 25000,
  },
  {
    id: "red-velvet",
    category: "Sweet & Milky",
    name: "Red Velvet",
    hotPrice: 28000,
    icePrice: 30000,
  },
  { id: "taro", category: "Sweet & Milky", name: "Taro", hotPrice: 28000, icePrice: 30000 },
  {
    id: "pandan-latte",
    category: "Sweet & Milky",
    name: "Pandan Latte",
    hotPrice: 23000,
    icePrice: 25000,
  },
  {
    id: "matcha-latte",
    category: "Sweet & Milky",
    name: "Matcha Latte",
    description:
      "Matcha premix yang creamy dengan rasa ringan dan manis alami. Mudah dinikmati, tidak pahit, dan cocok untuk penyuka matcha soft.",
    hotPrice: 28000,
    icePrice: 30000,
  },
  {
    id: "matcha-choco-cloudy-berry",
    category: "Sweet & Milky",
    name: "Matcha / Choco / Cloudy Berry",
    variantNote: "Pilih salah satu rasa premix",
    description:
      "Perpaduan premix yang smooth dengan susu fruity dan segar — creamy namun ringan, dengan sensasi manis-segar yang seimbang.",
    hotPrice: 28000,
    icePrice: 30000,
  },
  {
    id: "klepon-latte",
    category: "Sweet & Milky",
    name: "Klepon Latte",
    hotPrice: 29000,
    icePrice: 31000,
  },
  { id: "candy-pop", category: "Sweet & Milky", name: "Candy Pop", icePrice: 25000 },
  {
    id: "earl-grey-milktea",
    category: "Sweet & Milky",
    name: "Earl Grey Milktea",
    icePrice: 25000,
  },
  {
    id: "white-peach-oolong-milk-tea",
    category: "Sweet & Milky",
    name: "White Peach Oolong Milk Tea",
    icePrice: 28000,
  },
  { id: "charcoal", category: "Sweet & Milky", name: "Charcoal", hotPrice: 26000, icePrice: 28000 },

  // ---------- Matcha (Ceremonial Matcha) ----------
  {
    id: "pure-matcha-latte",
    category: "Matcha",
    name: "Pure Matcha Latte",
    description:
      "Ceremonial matcha dengan rasa vibrant dan aromatik. Teksturnya smooth, earthy, dan clean — pengalaman matcha yang otentik dan refined.",
    hotPrice: 33000,
    icePrice: 35000,
  },
  {
    id: "brown-sugar-matcha-latte",
    category: "Matcha",
    name: "Brown Sugar Matcha Latte",
    description:
      "Matcha ceremonial grade yang halus dipadukan dengan manis karamel brown sugar. Creamy, earthy, dan seimbang dengan aftertaste yang bersih.",
    icePrice: 35000,
  },
  {
    id: "matcha-royale",
    category: "Matcha",
    name: "Matcha Royale",
    description:
      "Perpaduan Earl Grey yang floral dan matcha ceremonial yang earthy. Rasa ringan namun elegan, dengan aroma bergamot segar dan finishing calming.",
    icePrice: 35000,
  },
  {
    id: "matcha-kick",
    category: "Matcha",
    name: "Matcha Kick",
    description:
      "Kombinasi espresso bold dan matcha ceremonial yang creamy. Sensasi pahit-kopi berpadu lembut dengan karakter matcha yang menenangkan.",
    icePrice: 40000,
  },

  // ---------- Mocktail ----------
  { id: "golden-hour", category: "Mocktail", name: "Golden Hour", icePrice: 30000 },
  {
    id: "mont-blanc",
    category: "Mocktail",
    name: "Mont Blanc",
    description:
      "Cold brew yang bright dengan sentuhan citrus Sunkist, dilapisi krim lembut beraroma nutmeg, cinnamon, dan vanilla.",
    icePrice: 38000,
  },
  {
    id: "sunny-citrus",
    category: "Mocktail",
    name: "Sunny Citrus",
    description:
      "Cold brew yang smooth dipadukan dengan Sunkist orange segar, orange bitter syrup, dan aroma orange zest.",
    icePrice: 33000,
  },
  {
    id: "strawberry-breeze-cold-brew",
    category: "Mocktail",
    name: "Strawberry Breeze Cold Brew",
    icePrice: 35000,
  },

  // ---------- Refreshers Tea ----------
  {
    id: "refreshers-tea-flavors",
    category: "Refreshers Tea",
    name: "Refreshers Tea",
    variantNote: "Lychee / Lemon / Orange / Mango / Blackcurrant / Peach",
    hotPrice: 18000,
    icePrice: 20000,
  },
  {
    id: "mango-orange-squash",
    category: "Refreshers Tea",
    name: "Mango / Orange Squash",
    icePrice: 22000,
  },
  {
    id: "strawberry-squash",
    category: "Refreshers Tea",
    name: "Strawberry Squash",
    icePrice: 26000,
  },

  // ---------- Frappe ----------
  { id: "cookies-n-cream", category: "Frappe", name: "Cookies N Cream", icePrice: 28000 },
  { id: "cotton-candy", category: "Frappe", name: "Cotton Candy", icePrice: 28000 },
  { id: "bubble-gum", category: "Frappe", name: "Bubble Gum", icePrice: 28000 },

  // ---------- Main Dishes ----------
  { id: "spaghetti-brulee", category: "Main Dishes", name: "Spaghetti Brulee", hotPrice: 28000 },
  {
    id: "spaghetti-bolognese",
    category: "Main Dishes",
    name: "Spaghetti Bolognese",
    hotPrice: 28000,
  },
  {
    id: "spaghetti-aglio-olio",
    category: "Main Dishes",
    name: "Spaghetti Aglio Olio",
    hotPrice: 28000,
  },
  {
    id: "tuna-spaghetti-by-uls",
    category: "Main Dishes",
    name: "Tuna Spaghetti by ULS",
    signature: true,
    hotPrice: 30000,
  },
  {
    id: "chicken-sambal-mercon",
    category: "Main Dishes",
    name: "Chicken Sambal Mercon",
    spicy: true,
    hotPrice: 32000,
  },
  {
    id: "chicken-blackpepper",
    category: "Main Dishes",
    name: "Chicken Blackpepper",
    description: "Ayam crispy bersaus lada hitam aromatik dengan nasi dan telur.",
    spicy: true,
    hotPrice: 32000,
  },
  {
    id: "chicken-sambal-matah",
    category: "Main Dishes",
    name: "Chicken Sambal Matah",
    description:
      "Ayam crispy dengan sambal matah segar, disajikan bersama nasi dan telur.",
    signature: true,
    spicy: true,
    hotPrice: 32000,
  },
  {
    id: "chicken-salted-egg",
    category: "Main Dishes",
    name: "Chicken Salted Egg",
    description:
      "Ayam crispy berbalut saus telur asin creamy, lengkap dengan nasi dan telur.",
    signature: true,
    hotPrice: 37000,
  },
  {
    id: "chicken-thai-basil",
    category: "Main Dishes",
    name: "Chicken Thai Basil",
    description: "Ayam tumis basil ala Thailand dengan rasa gurih pedas dan nasi hangat.",
    signature: true,
    hotPrice: 35000,
  },
  {
    id: "crispy-chicken-mentai",
    category: "Main Dishes",
    name: "Crispy Chicken Mentai",
    signature: true,
    spicy: true,
    hotPrice: 28000,
  },
  {
    id: "chicken-saos-mentega",
    category: "Main Dishes",
    name: "Chicken Saos Mentega",
    description:
      "Nasi putih, potongan ayam goreng bersaus mentega wijen, telur mata sapi, dan irisan timun segar.",
    hotPrice: 35000,
  },
  {
    id: "garlic-butter-chicken",
    category: "Main Dishes",
    name: "Garlic Butter Chicken",
    hotPrice: 25000,
  },
  { id: "beef-teriyaki", category: "Main Dishes", name: "Beef Teriyaki", hotPrice: 40000 },
  {
    id: "beef-blackpepper",
    category: "Main Dishes",
    name: "Beef Blackpepper",
    spicy: true,
    hotPrice: 40000,
  },
  {
    id: "nasi-telur-pontianak",
    category: "Main Dishes",
    name: "Nasi Telur Pontianak",
    description:
      "Nasi hangat dengan telur setengah matang dan kuah kecap gurih khas Pontianak.",
    hotPrice: 25000,
  },
  {
    id: "honey-garlic-nugget",
    category: "Main Dishes",
    name: "Honey Garlic Nugget",
    signature: true,
    hotPrice: 25000,
  },

  // ---------- Nasi Goreng ----------
  {
    id: "nasi-goreng-memory",
    category: "Nasi Goreng",
    name: "Nasi Goreng Memory",
    description:
      "Nasi goreng signature dari Memory Coffee dengan rasa pedas dan gurih, dengan penambahan potongan ayam goreng tepung.",
    signature: true,
    spicy: true,
    hotPrice: 35000,
  },
  {
    id: "nasi-goreng-saus-tiram",
    category: "Nasi Goreng",
    name: "Nasi Goreng Saus Tiram",
    description:
      "Nasi goreng yang lebih dominan rasa asin dan manis saus tiram. Didampingi telur mata sapi untuk pelengkap rasa. Cocok untuk anak-anak.",
    hotPrice: 30000,
  },
  {
    id: "nasi-goreng-rumahan",
    category: "Nasi Goreng",
    name: "Nasi Goreng Rumahan",
    description: "Nasi goreng rasa gurih dan sedikit pedas, mengingatkan masakan nenek di rumah.",
    hotPrice: 30000,
  },

  // ---------- Toast ----------
  { id: "chicken-toast", category: "Toast", name: "Chicken Toast", hotPrice: 30000 },
  {
    id: "smoked-beef-toast",
    category: "Toast",
    name: "Smoked Beef Toast",
    signature: true,
    hotPrice: 38000,
  },
  {
    id: "peanut-butter-jam-toast",
    category: "Toast",
    name: "Peanut Butter Jam Toast",
    hotPrice: 25000,
  },

  // ---------- Light Bites ----------
  {
    id: "mix-platter",
    category: "Light Bites",
    name: "Mix Platter",
    variantNote: "French Fries / Chic Stick / Sweet Potato / Sausage",
    hotPrice: 45000,
  },
  {
    id: "crispy-choco-banana",
    category: "Light Bites",
    name: "Crispy Choco Banana",
    description:
      "Pisang goreng coklat renyah dipadukan parutan keju. Kombinasi tekstur crispy, rasa cokelat dan keju yang kaya menjadikannya dessert favorit untuk semua usia.",
    hotPrice: 20000,
  },
  { id: "churros", category: "Light Bites", name: "Churros", signature: true, hotPrice: 20000 },
  { id: "cireng", category: "Light Bites", name: "Cireng", signature: true, hotPrice: 20000 },
  {
    id: "pisang-goreng",
    category: "Light Bites",
    name: "Pisang Goreng",
    description:
      "Pisang matang berbalut adonan tipis lalu digoreng. Disajikan dengan bubuk gula aren. Manis, lembut, dan harum — camilan tradisional yang selalu menggugah selera.",
    hotPrice: 20000,
  },
  {
    id: "tempe-mendoan",
    category: "Light Bites",
    name: "Tempe Mendoan",
    signature: true,
    hotPrice: 21000,
  },
  { id: "mini-pangsit", category: "Light Bites", name: "Mini Pangsit", hotPrice: 21000 },
  {
    id: "sweet-potato-fries",
    category: "Light Bites",
    name: "Sweet Potato Fries",
    description:
      "Irisan ubi manis yang digoreng renyah, menghadirkan perpaduan rasa manis alami dan tekstur garing.",
    hotPrice: 23000,
  },
  {
    id: "french-fries",
    category: "Light Bites",
    name: "French Fries",
    description:
      "Kentang goreng klasik, gurih di luar dan lembut di dalam. Disajikan dengan bumbu ringan.",
    hotPrice: 23000,
  },
  { id: "chic-stick", category: "Light Bites", name: "Chic Stick", hotPrice: 25000 },

  // ---------- Breakfast ----------
  {
    id: "daily-breakfast",
    category: "Breakfast",
    name: "Daily Breakfast",
    description:
      "Classic start, every morning. Fluffy pancakes, savory sausages, soft scrambled eggs, dan sentuhan segar sayuran.",
    hotPrice: 25000,
  },

  // ---------- Dessert ----------
  {
    id: "waffle",
    category: "Dessert",
    name: "Waffle",
    variantNote: "Chocolate / Caramel / Lotus",
    description:
      "Waffle dengan ice cream — perpaduan hangat dan dingin, renyah dan lembut, disiram syrup atau chocolate.",
    signature: true,
    hotPrice: 25000,
  },
  {
    id: "pancake",
    category: "Dessert",
    name: "Pancake",
    variantNote: "Chocolate / Caramel / Lotus",
    description:
      "Tumpukan pancake lembut bertemu manisnya ice cream yang meleleh — pas untuk yang percaya breakfast dan dessert bisa jadi satu piring.",
    hotPrice: 25000,
  },
  { id: "savory-waffle-memory", category: "Dessert", name: "Savory Waffle Memory", hotPrice: 35000 },
  { id: "tape-gabin", category: "Dessert", name: "Tape Gabin", hotPrice: 5000 },
  {
    id: "bolu-kopi",
    category: "Dessert",
    name: "Bolu Kopi",
    availability: "Snack harian — tersedia Senin & Selasa",
    hotPrice: 10000,
  },
  {
    id: "brownies-burnt-cheesecake",
    category: "Dessert",
    name: "Brownies Burnt Cheesecake",
    availability: "Snack harian — tersedia Senin & Minggu",
    hotPrice: 20000,
  },
  {
    id: "bomboloni",
    category: "Dessert",
    name: "Bomboloni",
    availability: "Snack harian — tersedia Selasa & Rabu",
    hotPrice: 8000,
  },
  {
    id: "bolu-coklat",
    category: "Dessert",
    name: "Bolu Coklat",
    availability: "Snack harian — tersedia Rabu & Kamis",
    hotPrice: 10000,
  },
  {
    id: "espresso-brownies",
    category: "Dessert",
    name: "Espresso Brownies",
    availability: "Snack harian — tersedia Kamis & Jumat",
    hotPrice: 13000,
  },
  {
    id: "classic-burnt-cheesecake",
    category: "Dessert",
    name: "Classic Burnt Cheesecake",
    availability: "Snack harian — tersedia Jumat",
    hotPrice: 20000,
  },
  {
    id: "matcha-burnt-cheesecake",
    category: "Dessert",
    name: "Matcha Burnt Cheesecake",
    availability: "Snack harian — tersedia Sabtu",
    hotPrice: 30000,
  },
  {
    id: "donat-kentang",
    category: "Dessert",
    name: "Donat Kentang",
    availability: "Snack harian — tersedia Sabtu & Minggu",
    hotPrice: 6000,
  },

  // ---------- Rasa Lokal ----------
  {
    id: "ayam-cabe-merah",
    category: "Rasa Lokal",
    name: "Ayam Cabe Merah",
    hotPrice: 35000,
  },
  {
    id: "ayam-cabe-hijau",
    category: "Rasa Lokal",
    name: "Ayam Cabe Hijau",
    hotPrice: 35000,
  },
  {
    id: "dendeng-cabe-merah",
    category: "Rasa Lokal",
    name: "Dendeng Cabe Merah",
    hotPrice: 45000,
  },
  {
    id: "dendeng-cabe-hijau",
    category: "Rasa Lokal",
    name: "Dendeng Cabe Hijau",
    hotPrice: 45000,
  },
];

export type OrderableMenuItem = {
  skuId: string;
  itemId: string;
  category: MenuCategory;
  name: string;
  variantLabel?: "Hot" | "Ice";
  price: number;
};

export const ORDERABLE_MENU: OrderableMenuItem[] = MENU.flatMap((item) => {
  if (item.hotPrice != null && item.icePrice != null) {
    return [
      {
        skuId: `${item.id}-hot`,
        itemId: item.id,
        category: item.category,
        name: item.name,
        variantLabel: "Hot" as const,
        price: item.hotPrice,
      },
      {
        skuId: `${item.id}-ice`,
        itemId: item.id,
        category: item.category,
        name: item.name,
        variantLabel: "Ice" as const,
        price: item.icePrice,
      },
    ];
  }

  const price = item.hotPrice ?? item.icePrice;
  if (price == null) return [];

  return [
    {
      skuId: item.id,
      itemId: item.id,
      category: item.category,
      name: item.name,
      price,
    },
  ];
});
