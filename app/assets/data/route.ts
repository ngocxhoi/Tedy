export const HeaderData: headerItem[] = [
  { label: "Product", href: "/#product" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Features", href: "/#features " },
  { label: "Contact Us", href: "/#contact " },
  { label: "Docs", href: "#" },
];

export const FeatureData: featureData[] = [
  {
    imgSrc: "/images/features/time.svg",
    heading: "Unpaid Bill Alerts",
    paragraph:
      "Never miss a due date again. Get instant alerts for upcoming payments. Stay on top of your bills, effortlessly.",
  },
  {
    imgSrc: "/images/features/signal.svg",
    heading: "Spending Insights",
    paragraph:
      "Track where your money goes. See spending by category. Make smarter choices with clear insights.",
  },
  {
    imgSrc: "/images/features/dollar.svg",
    heading: "Card Management",
    paragraph:
      "Link all your cards. Track balances and activity. Manage everything in one dashboard.",
  },
];

export const PlansData: plansData[] = [
  {
    heading: "Lite",
    price: {
      monthly: 19,
      yearly: 190,
    },
    subscriber: 0.5,
    button: "Purchase",
    option: [
      "Basic invoice generation",
      "Downloadable PDF invoice",
      "Unlimited transactions",
      "Emails for all the updates",
    ],
    category: ["monthly", "yearly"],
    imgSrc: "/images/pricing/starone.svg",
  },
  {
    heading: "Basic",
    price: {
      monthly: 29,
      yearly: 290,
    },
    subscriber: 0.5,
    button: "Purchase",
    option: [
      "All Lite features",
      "Custom invoice templates",
      "Tax calculation support",
      "Automatic invoice reminders",
    ],
    category: ["monthly", "yearly"],
    imgSrc: "/images/pricing/startwo.svg",
  },
  {
    heading: "Plus",
    price: {
      monthly: 59,
      yearly: 590,
    },
    subscriber: 0.5,
    button: "Purchase",
    option: [
      "All Basic features",
      "Multi-currency support",
      "Invoice payment tracking",
      "Priority customer support",
    ],
    category: ["monthly", "yearly"],
    imgSrc: "/images/pricing/starthree.svg",
  },
];

export const FooterLinks: footerlLinksData[] = [
  { label: "Product", href: "/#product" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Features", href: "/#features " },
  { label: "Contact Us", href: "/#contact " },
];

export const SocialLinks: socialLinksData[] = [
  {
    imgSrc: "fa-brands:facebook-f",
    link: "www.facebook.com",
    width: 10,
  },
  {
    imgSrc: "fa6-brands:instagram",
    link: "www.instagram.com",
    width: 14,
  },
  {
    imgSrc: "fa6-brands:twitter",
    link: "www.twitter.com",
    width: 14,
  },
];

export const AsideLinks: asideLinksData[] = [
  {
    label: "Conversation",
    href: "/dashboard/conversation",
    icon: "i-lucide-message-square",
  },
  {
    label: "Code Generator",
    href: "/dashboard/code-generator",
    icon: "i-lucide:code",
  },
  {
    label: "AI Article Writer",
    href: "/dashboard/writer-article",
    icon: "i-lucide-file-text",
  },
  {
    label: "Image Generator",
    href: "/dashboard/image-generator",
    icon: "i-lucide-sticky-note",
  },
  {
    label: "Background Removal",
    href: "/dashboard/background-removal",
    icon: "i-lucide-eraser",
  },
  {
    label: "Object Removal",
    href: "/dashboard/object-removal",
    icon: "i-lucide-eraser",
  },
  {
    label: "Resume PDF",
    href: "/dashboard/resume-reviewer",
    icon: "i-lucide-file-text",
  },
];
