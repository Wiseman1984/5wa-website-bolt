/**
 * 5WA Token - Internationalization (i18n)
 * Multi-language support for English and Traditional Chinese
 */

export type Language = 'en' | 'zh';

export interface SiteContent {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
  };
  navigation: {
    home: string;
    tokenomics: string;
    burnMechanism: string;
    verification: string;
    buyGuide: string;
    realCases: string;
    securityGuide: string;
    airdrop: string;
    whitepaper: string;
    language: string;
  };
  homepage: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      exploreTokenomics?: string;
      howToBuy?: string;
    };
    mission: {
      title: string;
      content: string;
    };
    concept: {
      title: string;
      content: string;
    };
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  tokenomics: {
    title: string;
    subtitle: string;
    overview: {
      totalSupply: string;
      burned: string;
      locked: string;
      circulating: string;
    };
    description: string;
    sections: {
      distribution: {
        title: string;
        description: string;
        items: Array<{
          label: string;
          value: string;
          color: string;
        }>;
      };
      lockup: {
        title: string;
        description: string;
        monthlyUnlock: string;
        totalLocked: string;
        lockupPeriod: string;
      };
    };
  };
  burnMechanism: {
    title: string;
    subtitle: string;
    description: string;
    mechanism: {
      title: string;
      steps: Array<{
        number: number;
        title: string;
        description: string;
      }>;
      monthlyBurn: string;
      annualBurn: string;
      totalBurnOver4Years: string;
    };
    impact: {
      title: string;
      description: string;
      projection: Array<{
        period: string;
        burnedTokens: string;
        totalSupply: string;
      }>;
    };
  };
  verification: {
    title: string;
    subtitle: string;
    description: string;
    verificationLinks: Array<{
      title: string;
      description: string;
      address: string;
      network: string;
      explorer: string;
    }>;
    burnHistory: {
      title: string;
      description: string;
      events: Array<{
        date: string;
        amount: string;
        txHash: string;
      }>;
    };
  };
  buyGuide: {
    title: string;
    subtitle: string;
    introduction: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
      details: string[];
    }>;
    tips: {
      title: string;
      items: string[];
    };
    risks: {
      title: string;
      content: string;
    };
  };
  realCases: {
    title: string;
    subtitle: string;
    description: string;
    cases: Array<{
      id: string;
      title: string;
      description: string;
      date: string;
      location: string;
      amount: string;
      severity: 'critical' | 'high' | 'medium';
      source: string;
      sourceUrl: string;
      details: string[];
    }>;
  };
  securityGuide: {
    title: string;
    subtitle: string;
    introduction: string;
    sections: Array<{
      id: string;
      title: string;
      description: string;
      tips: Array<{
        title: string;
        content: string;
      }>;
    }>;
  };
  airdrop: {
    title: string;
    subtitle: string;
    description: string;
    narrative: {
      title: string;
      content: string;
    };
    privacy: string;
    checklist: {
      title: string;
      stages: Array<{
        title: string;
        items: Array<{
          id: string;
          text: string;
        }>;
      }>;
    };
    scoring: {
      title: string;
      tiers: Array<{
        stars: string;
        level: string;
        message: string;
        suggestion: string;
      }>;
    };
    rewards: {
      title: string;
      description: string;
      perStar: string;
      bonus: string;
    };
    sharing: {
      title: string;
      button: string;
      tweetTemplate: string;
    };
    wallet: {
      title: string;
      label: string;
      placeholder: string;
      error: string;
      counter: string;
      maxParticipants: string;
    };
    submit: {
      button: string;
      success: string;
      successMessage: string;
    };
  };
  whitepaper: {
    title: string;
    subtitle: string;
    narrative: {
      title: string;
      vanishingBorder: { title: string; content: string };
      whyNow: { title: string; points: string[] };
      mission: { title: string; content: string };
    };
    coreTokenomics: {
      title: string;
      items: Array<{ label: string; value: string }>;
    };
    allocation: {
      title: string;
      categories: Array<{ name: string; amount: string; percentage: string; mechanism: string }>;
    };
    governance: {
      title: string;
      trackA: { title: string; description: string; dailyRelease: string; mechanism: string };
      trackB: { title: string; description: string; dailyRelease: string; mechanism: string };
      burn: { title: string; description: string; frequency: string; target: string };
    };
    roadmap: {
      title: string;
      phases: Array<{ phase: string; period: string; items: string[] }>;
    };
    conclusion: { title: string; content: string; quote: string };
  };
  footer: {
    copyright: string;
    disclaimer: string;
    links: {
      privacy: string;
      terms: string;
      contact: string;
    };
  };
}

// English Content
export const contentEN: SiteContent = {
  brand: {
    name: "$5 Wrench Attack",
    shortName: "5WA",
    tagline: "Physical Security. Digital Trust.",
    description: "An AI-powered physical security platform combining public threat intelligence, practical OpSec guidance, and transparent infrastructure for Web3 participants.",
  },
  navigation: {
    home: "Home",
    tokenomics: "Tokenomics",
    burnMechanism: "Burn Mechanism",
    verification: "Dashboard",
    buyGuide: "How to Buy",
    realCases: "Real Cases",
    securityGuide: "Security Guide",
    airdrop: "Airdrop",
    whitepaper: "Whitepaper",
    language: "Language",
  },
  homepage: {
    hero: {
      title: "$5 Wrench Attack",
      subtitle: "Decentralized AI-Powered Physical Security Platform",
      description:
        "Redefining Consensus: From Digital Encryption to Physical Resilience in the Age of AGI and Web3. We are building a multi-layered defense system that combines AI-powered threat intelligence, decentralized guardian networks, and privacy-preserving tools to protect Web3 participants from physical threats.",
    },
    mission: {
      title: "Our Mission",
      content:
        "We are building a strong consensus around privacy and security awareness. The $5 Wrench Attack represents the ultimate truth: digital security is only as strong as its physical protection. Our token project embodies this philosophy through extreme deflationary mechanics and transparent lock-up mechanisms.",
    },
    concept: {
      title: "The $5 Wrench Attack Concept",
      content:
        "In cybersecurity, the \"$5 Wrench Attack\" refers to a scenario where someone uses a simple tool (like a $5 wrench) to physically compromise a system, bypassing all digital security measures. This metaphor reminds us that security is multifaceted—it requires both digital and physical safeguards. Our token project celebrates this principle by combining security education with innovative tokenomics.",
    },
    features: [
      {
        title: "AI Threat Intelligence",
        description: "On-chain anomaly detection, social sentiment analysis, and geopolitical risk data powered by GNNs and ML for personalized risk scoring.",
      },
      {
        title: "Guardian AI Agent",
        description: "LLM-powered security assistant providing automated SOPs, emergency protocols, and personalized recommendations.",
      },
      {
        title: "87.5% Deflationary Model",
        description: "From 8B genesis to 1B final target. 75% locked on PinkLock with 24-month daily linear unlock starting January 2027.",
      },
      {
        title: "Decentralized Guardian Network",
        description: "Community-operated nodes for anonymous threat reporting, validation, and rapid alert dissemination across the network.",
      },
    ],
  },
  tokenomics: {
    title: "Token Economics",
    subtitle: "Precision-Engineered Deflation",
    overview: {
      totalSupply: "1 Billion",
      burned: "7 Billion (87.5%)",
      locked: "750 Million (75%)",
      circulating: "50 Million (5%)",
    },
    description:
      "Total supply adjusted to 1,000,000,000 (1 Billion) 5WA after a large-scale burn. Our economic model ensures long-term market health and participant consensus through transparent lock-up and ecosystem reserves.",
    sections: {
      distribution: {
        title: "Token Distribution (Post-Burn)",
        description:
          "The 1 Billion post-burn supply is distributed as: 75% Long-Term Trust Lock-up (750M), 20% Ecosystem Development Reserve (200M), and 5% Initial Circulation (50M).",
        items: [
          { label: "Long-Term Trust Lock-up", value: "750M (75%)", color: "#3b82f6" },
          { label: "Ecosystem Development Reserve", value: "200M (20%)", color: "#f59e0b" },
          { label: "Initial Circulation", value: "50M (5%)", color: "#10b981" },
        ],
      },
      lockup: {
        title: "24-Month Daily Linear Unlock (PinkLock)",
        description:
          "750 million tokens (75% of post-burn supply) are locked on the PinkLock platform. Starting January 01, 2027, a 24-month daily linear unlock program commences, building a smooth and stable liquidity curve.",
        monthlyUnlock: "~31.25 Million tokens per month",
        totalLocked: "750 Million tokens",
        lockupPeriod: "24 months (730 days)",
      },
    },
  },
  burnMechanism: {
    title: "Quarterly Strategic Burn",
    subtitle: "Deflationary Mechanism",
    description:
      "To achieve our 90% supply reduction target, we implement quarterly strategic burns of unused tokens. Every quarter, we audit token usage across both vesting tracks and permanently remove unused tokens via Multi-Sig wallet to dead address.",
    mechanism: {
      title: "How It Works",
      steps: [
        {
          number: 1,
          title: "Dual-Track Daily Vesting",
          description: "3.7B tokens unlock daily across Track A (Marketing & Ecosystem) and Track B (Liquidity Maintenance), each releasing ~1.689M tokens daily.",
        },
        {
          number: 2,
          title: "Quarterly Audit",
          description: "Every quarter, we audit the actual usage of unlocked tokens across both tracks to identify unused amounts.",
        },
        {
          number: 3,
          title: "Strategic Burn",
          description: "Unused tokens are transferred to dead address via Multi-Sig wallet, permanently removing them from circulation.",
        },
        {
          number: 4,
          title: "Transparency Report",
          description: "Within 24 hours of each quarterly burn, a detailed transparency report is published on-chain.",
        },
      ],
      monthlyBurn: "~1.689 Million tokens per day (Track A & B combined)",
      annualBurn: "~616.9 Million tokens per year",
      totalBurnOver4Years: "~1.8 Billion tokens (estimated)",
    },
    impact: {
      title: "Burn Target & Impact",
      description:
        "Target: Reduce total supply by 90% (from 8B to 800M-1B). Through quarterly strategic burns of unused tokens, we aim to achieve significant deflation while maintaining liquidity and ecosystem growth.",
      projection: [
        { period: "Year 1", burnedTokens: "~617M", totalSupply: "~7.383B" },
        { period: "Year 2", burnedTokens: "~1.234B", totalSupply: "~6.766B" },
        { period: "Year 3", burnedTokens: "~1.851B", totalSupply: "~6.149B" },
        { period: "Year 3+", burnedTokens: "Target 90%", totalSupply: "~800M-1B" },
      ],
    },
  },
  verification: {
    title: "Blockchain Verification",
    subtitle: "Transparent Lock-Up Proof",
    description:
      "All token lock-ups and burn mechanisms are verifiable on the blockchain. We believe in complete transparency. Click the links below to verify our lock-up status on major blockchain explorers.",
    verificationLinks: [
      {
        title: "5WA Token Contract",
        description: "Verify the 5WA token contract on BNB Smart Chain",
        address: "0x392A6a53330fF20D47454BAf76eD6aB0a88571FD",
        network: "BNB Smart Chain (BSC)",
        explorer: "https://bscscan.com/token/0x392A6a53330fF20D47454BAf76eD6aB0a88571FD",
      },
      {
        title: "Burn Address",
        description: "Verify all burned tokens at the burn address",
        address: "0x000000000000000000000000000000000000dEaD",
        network: "BNB Smart Chain (BSC)",
        explorer: "https://bscscan.com/address/0x000000000000000000000000000000000000dEaD",
      },
      {
        title: "Multi-sig Governance Wallet",
        description: "Verify the multi-signature governance wallet used for strategic burns",
        address: "0xc3cbdfE9766D446B300e30144C73eb5c3Ab69c08",
        network: "BNB Smart Chain (BSC)",
        explorer: "https://bscscan.com/address/0xc3cbdfE9766D446B300e30144C73eb5c3Ab69c08",
      },
      {
        title: "PinkLock Vesting Record (749,999,390 5WA)",
        description: "Verify the 24-month linear vesting schedule via PinkSale PinkLock V2",
        address: "PinkLock Record #1653235",
        network: "BNB Smart Chain (BSC)",
        explorer: "https://www.pinksale.finance/pinklock/bsc/record/1653235",
      },
      {
        title: "Strategic Burn Tx 1 — 500,000,000 5WA",
        description: "Strategic burn transaction 1: 500M tokens sent from Multi-sig wallet to dead address",
        address: "0x4249523a33a7cccf23472ff63d8c7f0516ff233f02b2471aab6a41f2274d6279",
        network: "BNB Smart Chain (BSC)",
        explorer: "https://bscscan.com/tx/0x4249523a33a7cccf23472ff63d8c7f0516ff233f02b2471aab6a41f2274d6279",
      },
      {
        title: "Strategic Burn Tx 2 — 2,500,000,000 5WA",
        description: "Strategic burn transaction 2: 2.5B tokens sent from Multi-sig wallet to dead address",
        address: "0x6b49448610903b64bf57eee82166477be03bf2c6d168c832a38c3156cf78de2b",
        network: "BNB Smart Chain (BSC)",
        explorer: "https://bscscan.com/tx/0x6b49448610903b64bf57eee82166477be03bf2c6d168c832a38c3156cf78de2b",
      },
    ],
    burnHistory: {
      title: "Burn History",
      description: "Track all burn events and verify burn progress",
      events: [
        { date: "2026-Q2 (Genesis)", amount: "4,000,000,000 5WA", txHash: "0xe506b4cf07afa63c8ca8a8bcac962477957357196014c15daecb7757072c3f4e" },
        { date: "2026-Q2 (Strategic Burn Tx 1)", amount: "500,000,000 5WA", txHash: "0x4249523a33a7cccf23472ff63d8c7f0516ff233f02b2471aab6a41f2274d6279" },
        { date: "2026-Q2 (Strategic Burn Tx 2)", amount: "2,500,000,000 5WA", txHash: "0x6b49448610903b64bf57eee82166477be03bf2c6d168c832a38c3156cf78de2b" },
      ],
    },
  },
  buyGuide: {
    title: "How to Buy 5WA",
    subtitle: "Step-by-Step Purchase Guide",
    introduction:
      "The primary acquisition method for $5WA tokens will be through our DODO crowdfunding mechanism (Coming Soon). In the meantime, you can purchase on PancakeSwap DEX. Always verify the contract address before making any transactions.",
    steps: [
      {
        number: 1,
        title: "Set Up a Wallet",
        description:
          "Download and install a Web3 wallet such as MetaMask, Trust Wallet, or WalletConnect. Create a new wallet or import an existing one.",
        details: [
          "Download MetaMask from https://metamask.io",
          "Create a new wallet and securely save your seed phrase",
          "Add funds (BNB or USDT) to your wallet and ensure you are on BNB Smart Chain",
        ],
      },
      {
        number: 2,
        title: "Connect to DEX",
        description:
          "Visit PancakeSwap (https://pancakeswap.finance), the leading BSC DEX. Connect your wallet to the platform.",
        details: [
          "Go to https://pancakeswap.finance (or your preferred BSC DEX)",
          "Click 'Connect Wallet' and select your wallet type",
          "Approve the connection in your wallet",
        ],
      },
      {
        number: 3,
        title: "Search for 5WA Token",
        description:
          "Search for the \"$5 Wrench Attack\" token contract address. Verify the token details to ensure authenticity.",
        details: [
          "Contract Address: 0x392A6a53330fF20D47454BAf76eD6aB0a88571FD",
          "Verify token name and symbol match official sources",
          "Check liquidity and trading volume",
        ],
      },
      {
        number: 4,
        title: "Enter Purchase Amount",
        description:
          "Specify how much BNB or USDT you want to exchange for 5WA tokens. Review the exchange rate and slippage.",
        details: [
          "Enter the amount of BNB/USDT you want to spend",
          "Review the estimated 5WA tokens you will receive",
          "Set slippage tolerance (typically 0.5-1%)",
        ],
      },
      {
        number: 5,
        title: "Approve Transaction",
        description:
          "Review the transaction details and approve it in your wallet. Pay attention to gas fees.",
        details: [
          "Review all transaction details",
          "Confirm gas fee is acceptable",
          "Click 'Approve' in your wallet",
        ],
      },
      {
        number: 6,
        title: "Complete Purchase",
        description:
          "Confirm the swap transaction. Your 5WA tokens will appear in your wallet within seconds.",
        details: [
          "Click 'Swap' or 'Confirm' to complete the transaction",
          "Wait for the transaction to be confirmed on the blockchain",
          "Your 5WA tokens will appear in your wallet",
        ],
      },
      {
        number: 7,
        title: "Secure Your Tokens",
        description:
          "Transfer your tokens to a secure storage solution. Consider using a hardware wallet for large amounts.",
        details: [
          "Keep tokens in your wallet or transfer to cold storage",
          "Never share your private key or seed phrase",
          "Consider using a hardware wallet (Ledger, Trezor) for security",
        ],
      },
    ],
    tips: {
      title: "Important Tips",
      items: [
        "Always verify the official contract address before purchasing",
        "Start with a small amount to test the process",
        "Use slippage settings of 0.5-1% to avoid failed transactions",
        "Be aware of gas fees and market conditions",
        "Never share your private key or seed phrase with anyone",
        "Consider using a hardware wallet for large holdings",
      ],
    },
    risks: {
      title: "Risk Disclaimer",
      content:
        "Cryptocurrency investments carry significant risks. The value of tokens can fluctuate dramatically. Only invest what you can afford to lose. Do your own research (DYOR) and consult with financial advisors before making investment decisions.",
    },
  },
  realCases: {
    title: "Real Cases",
    subtitle: "Why Physical Security Matters",
    description:
      "These are real-world cases of cryptocurrency holders who fell victim to physical attacks, kidnappings, and extortion. Their stories highlight the critical importance of physical security alongside digital security. We share these cases to raise awareness and emphasize that no amount of digital encryption can protect against physical threats.",
    cases: [
      {
        id: "case-1",
        title: "Canadian $2 Million Bitcoin Hostage-Taking",
        description:
          "A Canadian family was held hostage overnight by four intruders who subjected them to waterboarding, sexual assault, and death threats. The attackers stole approximately $2 million in cryptocurrency.",
        date: "November 2025",
        location: "British Columbia, Canada",
        amount: "$2 Million",
        severity: "critical",
        source: "CBC News, Fortune Magazine",
        sourceUrl: "https://www.cbc.ca/news/canada/british-columbia/bitcoin-hostage-millions-cryptocurrency-9.6987994",
        details: [
          "4 intruders invaded the home",
          "Victims subjected to waterboarding and sexual assault",
          "Death threats used to coerce cryptocurrency transfers",
          "Approximately $2 million in crypto stolen",
        ],
      },
      {
        id: "case-2",
        title: "NYC Crypto Kidnapping and Torture Case",
        description:
          "Two men were indicted for kidnapping and torturing Bitcoin investors in a Manhattan home. They targeted wealthy crypto holders and used extreme violence to force them to reveal their digital assets.",
        date: "May 2025",
        location: "Manhattan, New York",
        amount: "Multiple victims",
        severity: "critical",
        source: "ABC News, The Guardian",
        sourceUrl: "https://abcnews.com/US/nyc-crypto-kidnapping-torture-case/story?id=122280419",
        details: [
          "Perpetrators: John Woeltz (37) and William Duplessie (33)",
          "Torture used to extract cryptocurrency access",
          "Targeted wealthy crypto investors in Manhattan",
          "Multiple victims subjected to violence",
        ],
      },
      {
        id: "case-3",
        title: "Bernal Heights Home Invasion - $3 Million Theft",
        description:
          "A masked intruder broke into a woman's home in broad daylight and stole $3 million in cryptocurrency. This case demonstrates how criminals specifically target cryptocurrency holders based on their known wealth.",
        date: "March 16, 2022",
        location: "Bernal Heights, San Francisco",
        amount: "$3 Million",
        severity: "high",
        source: "SF Standard",
        sourceUrl: "https://sfstandard.com/2026/01/10/ski-mask-knife-ipad-3-million-crypto-heist/",
        details: [
          "Daytime home invasion",
          "Masked perpetrator used knife and iPad",
          "$3 million in cryptocurrency stolen",
          "Victim alone in home at time of attack",
        ],
      },
      {
        id: "case-4",
        title: "Scottsdale Home Invasion - $66 Million Crypto Plot",
        description:
          "Two California teenagers were arrested for a targeted home invasion in Scottsdale linked to an alleged $66 million cryptocurrency robbery scheme. This case shows that crypto criminals span all age groups.",
        date: "February 2025",
        location: "Scottsdale, Arizona",
        amount: "$66 Million",
        severity: "high",
        source: "Fox 10 Phoenix, Fox News",
        sourceUrl: "https://www.fox10phoenix.com/news/targeted-scottsdale-home-invasion-linked-alleged-66m-cryptocurrency-plot",
        details: [
          "Two teenage perpetrators",
          "Traveled 600 miles to commit the crime",
          "Targeted home invasion",
          "Linked to $66 million cryptocurrency plot",
        ],
      },
      {
        id: "case-5",
        title: "Hong Kong $1.6 Million Bitcoin Robbery",
        description:
          "A Hong Kong man was sentenced to 7 years in prison for a violent home invasion that resulted in the theft of $1.6 million in Bitcoin. The attack included sexual assault and extreme violence.",
        date: "November 2025",
        location: "Hong Kong",
        amount: "$1.6 Million",
        severity: "critical",
        source: "NY Post",
        sourceUrl: "https://nypost.com/2025/11/24/business/crypto-thieves-waterboarded-sexually-assaulted-family-in-1-6m-heist/",
        details: [
          "Perpetrator sentenced to 7 years",
          "Home invasion with extreme violence",
          "Sexual assault during robbery",
          "$1.6 million in Bitcoin stolen",
        ],
      },
      {
        id: "case-6",
        title: "Irvine Serial Robbery Ring - Multiple Crypto Owners",
        description:
          "A robbery crew of 7 members targeted multiple cryptocurrency owners in Irvine through violent home invasions. All perpetrators were eventually captured after a series of attacks.",
        date: "September 2025",
        location: "Irvine, California",
        amount: "Multiple victims",
        severity: "high",
        source: "Local News Reports",
        sourceUrl: "https://www.youtube.com/watch?v=sA6D3UuQAZI",
        details: [
          "7-member robbery crew",
          "Multiple home invasions",
          "Targeted cryptocurrency owners",
          "All perpetrators captured by December 2025",
        ],
      },
      {
        id: "case-7",
        title: "Former LAPD Officer Cryptocurrency Theft",
        description:
          "A former Los Angeles Police Department officer was convicted of kidnapping and robbery after stealing $350,000 in cryptocurrency. This case highlights how criminals exploit positions of trust and authority.",
        date: "March 2025",
        location: "Los Angeles, California",
        amount: "$350,000",
        severity: "high",
        source: "Binance News",
        sourceUrl: "https://www.binance.com/en/square/post/297669894492353",
        details: [
          "Perpetrator: Former LAPD officer Eric Halem",
          "Abused law enforcement position",
          "Kidnapping and robbery charges",
          "$350,000 in cryptocurrency stolen",
        ],
      },
      {
        id: "case-8",
        title: "Madrid Kidnapping Attempt - Canadian Crypto Entrepreneur",
        description:
          "A Canadian crypto entrepreneur survived a kidnapping attempt in Madrid after witnesses alerted police. The attackers used zip ties, sleeping pills, and pepper spray in their attempt to abduct and extort the victim.",
        date: "March 2025",
        location: "Madrid, Spain",
        amount: "Attempted extortion",
        severity: "critical",
        source: "KuCoin News",
        sourceUrl: "https://www.kucoin.com/news/flash/canadian-crypto-entrepreneur-kidnapped-in-madrid-for-btc-and-private-keys",
        details: [
          "Victim: Canadian crypto entrepreneur",
          "Weapons: Zip ties, sleeping pills, pepper spray",
          "Survived due to witness intervention",
          "International scope of crypto crime",
        ],
      },
    ],
  },
  securityGuide: {
    title: "Security Protection Guide",
    subtitle: "Practical Measures to Protect Your Assets",
    introduction: "Physical security is just as important as digital security. This guide provides actionable steps to protect yourself, your identity, and your cryptocurrency holdings from physical threats and targeted attacks.",
    sections: [
      {
        id: "identity-protection",
        title: "Identity & Privacy Protection",
        description: "Prevent criminals from connecting your personal identity to your cryptocurrency holdings.",
        tips: [
          {
            title: "Maintain Operational Security (OPSEC)",
            content: "Never discuss your cryptocurrency holdings publicly or on social media. Avoid mentioning specific amounts, exchanges, or wallet details. Use pseudonyms online and separate your crypto identity from your real identity.",
          },
          {
            title: "Avoid Wealth Signaling",
            content: "Don't post about your investments, luxury purchases, or lifestyle changes. Criminals often target people who openly display wealth. Be especially cautious after significant gains or during bull markets.",
          },
          {
            title: "Use Privacy-Focused Services",
            content: "Use VPNs, Tor browser, and privacy-focused email services. Register domain names and business entities through privacy services. Use burner phones for sensitive communications.",
          },
          {
            title: "Separate Identities",
            content: "Maintain separate email addresses, phone numbers, and devices for different purposes. Use different usernames across platforms. Never link your crypto accounts to your social media profiles.",
          },
        ],
      },
      {
        id: "physical-security",
        title: "Physical Security Measures",
        description: "Implement practical security measures to protect your physical assets and personal safety.",
        tips: [
          {
            title: "Multi-Signature Wallets",
            content: "Use multi-signature (multisig) wallets that require multiple private keys to authorize transactions. Store keys in different physical locations. Require 2-of-3 or 3-of-5 signatures for large transactions.",
          },
          {
            title: "Hardware Wallet Security",
            content: "Use hardware wallets (Ledger, Trezor) for long-term storage. Store hardware wallets in a safe deposit box or secure location. Never leave wallets unattended or visible to guests.",
          },
          {
            title: "Distributed Storage",
            content: "Don't keep all assets in one location. Distribute holdings across multiple wallets, exchanges, and physical locations. Use geographic diversity to mitigate location-specific risks.",
          },
          {
            title: "Home Security",
            content: "Install security systems, cameras, and alarm systems. Use reinforced doors and windows. Maintain good relationships with neighbors. Consider security lighting and landscaping that prevents hiding spots.",
          },
        ],
      },
      {
        id: "social-media-safety",
        title: "Social Media & Digital Privacy",
        description: "Protect your online presence and prevent information leakage through digital channels.",
        tips: [
          {
            title: "Limit Public Information",
            content: "Set social media accounts to private. Don't share your location, work address, or daily schedule. Avoid geotagging photos. Don't announce travel plans or extended absences.",
          },
          {
            title: "Avoid Crypto Communities",
            content: "Be cautious in online crypto communities. Don't share portfolio details or transaction history. Avoid participating in discussions that reveal your wealth or holdings. Use separate accounts for crypto discussions.",
          },
          {
            title: "Email Security",
            content: "Use strong, unique passwords for all accounts. Enable two-factor authentication (2FA) on all important accounts. Use authenticator apps instead of SMS when possible. Monitor account activity regularly.",
          },
          {
            title: "Phishing Prevention",
            content: "Never click links in unsolicited emails or messages. Verify URLs before entering sensitive information. Use password managers to avoid entering credentials on fake sites. Be suspicious of urgent requests.",
          },
        ],
      },
      {
        id: "threat-response",
        title: "Response to Physical Threats",
        description: "Strategies to follow if you face physical threats or coercion.",
        tips: [
          {
            title: "Decoy Wallets",
            content: "Maintain decoy wallets with small amounts of cryptocurrency. If threatened, you can surrender decoy wallets to buy time or satisfy attackers. Keep decoys updated with occasional small transactions to appear active.",
          },
          {
            title: "Delayed Access Protocols",
            content: "Set up time-locked transactions or delayed withdrawal settings on exchanges. Configure accounts to require email confirmation before withdrawals. Use services that allow scheduled transactions.",
          },
          {
            title: "Emergency Contacts",
            content: "Establish secure communication channels with trusted contacts. Create code words for emergencies. Share emergency procedures with family members. Keep emergency contact information accessible but secure.",
          },
          {
            title: "Prioritize Personal Safety",
            content: "Your life is more valuable than your assets. If threatened, comply with demands. Contact law enforcement immediately. Seek medical attention if injured. Preserve evidence for police investigations.",
          },
        ],
      },
      {
        id: "travel-safety",
        title: "Travel & Daily Life Safety",
        description: "Maintain security awareness during travel and daily activities.",
        tips: [
          {
            title: "Travel Precautions",
            content: "Don't travel with large amounts of cryptocurrency or hardware wallets. Use secure communication channels. Inform trusted contacts of your travel plans. Avoid discussing wealth or holdings with strangers.",
          },
          {
            title: "Situational Awareness",
            content: "Be aware of your surroundings at all times. Notice people following you or unusual behavior. Vary your daily routines. Avoid predictable patterns. Trust your instincts about suspicious situations.",
          },
          {
            title: "Vehicle Security",
            content: "Keep your vehicle locked at all times. Park in well-lit, visible areas. Don't leave valuables in your car. Use anti-theft devices. Be cautious when approaching your vehicle.",
          },
          {
            title: "Meeting Security",
            content: "Meet people in public places. Bring a trusted companion. Inform others of your location and expected return time. Use secure communication channels. Never meet with strangers from online.",
          },
        ],
      },
    ],
  },
  airdrop: {
    title: "$5WA Airdrop",
    subtitle: "Season 1: Physical Security Basics",
    description: "Test your knowledge of physical security threats facing Web3 participants. Answer 6 questions about physical coercion and social engineering attack vectors, earn 5WA tokens based on your score, and help build a safer community.",
    narrative: {
      title: "Why did we design the $5WA mechanism so cautiously?",
      content: "Just as this quiz demonstrates, true security comes from **knowledge and preparation**.\n\n• Our 24-month linear unlock = the 'time buffer' in physical defense.\n• Our 87.5% token burn = reducing the system's 'attack surface'.\n• Our decentralized treasury management = 'multi-sig defense' at the physical level.\n\n$5WA: Safeguarding your physical security consensus in the AGI era.\n\nThis is a seasonal educational campaign. Future seasons will cover different threat vectors from the $5WA whitepaper, including supply chain attacks, travel & geo-location risks, and advanced OpSec.",
    },
    privacy: "This assessment does not collect any personal data. Your privacy is our priority.",
    checklist: {
      title: "Security Knowledge Quiz",
      stages: [
        {
          title: "Physical Coercion & Threat Awareness",
          items: [
            {
              id: "q1",
              text: "Q1: What is a \"$5 Wrench Attack\" in the crypto context?\nA) A DeFi exploit using flash loans\nB) A physical attack where someone threatens you with violence to hand over your crypto keys\nC) A phishing email disguised as a hardware wallet update\nD) A smart contract vulnerability",
            },
            {
              id: "q2",
              text: "Q2: You are traveling internationally and get stopped at customs. They ask you to unlock your phone and show your crypto wallets. What is the BEST pre-travel preparation?\nA) Refuse and risk detention\nB) Show them everything to avoid trouble\nC) Use \"Travel Mode\" — keep only a minimal wallet on your device, with main assets on hardware wallets stored elsewhere\nD) Delete all crypto apps permanently",
            },
            {
              id: "q3",
              text: "Q3: A stranger at a crypto meetup asks \"So how much Bitcoin do you hold?\" What's the safest response?\nA) Tell them your exact holdings to build trust\nB) Show them your portfolio app\nC) Deflect or give a vague answer — never reveal specific holdings\nD) Tell them you only hold memecoins",
            },
          ],
        },
        {
          title: "Social Engineering & OpSec",
          items: [
            {
              id: "q4",
              text: "Q4: You receive a DM from someone claiming to be \"exchange support\" asking you to verify your seed phrase. This is an example of:\nA) Legitimate customer service\nB) Social engineering attack\nC) On-chain analytics\nD) Multi-sig verification",
            },
            {
              id: "q5",
              text: "Q5: What is the PRIMARY purpose of a \"duress wallet\" (decoy wallet)?\nA) To store your main holdings with extra encryption\nB) To have a sacrificial wallet you can surrender under physical threat, protecting your real assets\nC) To hide illegal transactions from authorities\nD) To earn higher staking rewards",
            },
            {
              id: "q6",
              text: "Q6: Which physical security practice does $5WA recommend as a FIRST line of defense?\nA) Hiring armed bodyguards\nB) Never attending any crypto events\nC) Operational security (OpSec) — minimizing your visible crypto footprint and separating identities\nD) Storing all crypto on centralized exchanges",
            },
          ],
        },
      ],
    },
    scoring: {
      title: "Your Security Knowledge",
      tiers: [
        {
          stars: "0-1",
          level: "Vulnerable",
          message: "You need to learn more about physical security threats in Web3. The $5 Wrench Attack is a real and growing danger.",
          suggestion: "Read the $5WA Whitepaper and Security Guide to understand the threat landscape.",
        },
        {
          stars: "2-3",
          level: "Aware",
          message: "You have basic awareness of physical security threats, but significant gaps remain that could be exploited.",
          suggestion: "Study real-world attack cases and implement basic OpSec protocols.",
        },
        {
          stars: "4-5",
          level: "Informed",
          message: "You have a strong foundation of security knowledge with only minor gaps. You understand most attack vectors.",
          suggestion: "Focus on implementing duress wallets and travel mode protocols.",
        },
        {
          stars: "6",
          level: "Guardian",
          message: "Excellent! You demonstrate complete understanding of physical security threats and countermeasures. You think like a $5WA Guardian.",
          suggestion: "Share your knowledge with the community and help others stay safe.",
        },
      ],
    },
    rewards: {
      title: "Token Rewards",
      description: "Earn 5WA tokens based on your quiz score:",
      perStar: "Each correct answer earns 100–200 5WA based on question difficulty",
      bonus: "Perfect score (6/6) = 1,000 5WA maximum reward",
    },
    sharing: {
      title: "Share Your Achievement",
      button: "Share on X",
      tweetTemplate: "I scored {score}/6 on the $5WA Season 1 Physical Security Quiz! How well do you know the threats facing Web3 participants? Take the quiz at 5wa.io/airdrop #5WA #PhysicalSecurity",
    },
    wallet: {
      title: "Claim Your Airdrop",
      label: "BSC Wallet Address",
      placeholder: "0x...",
      error: "Please enter a valid BSC wallet address (starting with 0x)",
      counter: "Participants",
      maxParticipants: "Max 2000 participants",
    },
    submit: {
      button: "Submit & Claim",
      success: "Submission Received!",
      successMessage: "Thank you for completing the $5WA Season 1 Quiz! Your {amount} 5WA tokens will be distributed after the season ends (September 30, 2026). Check your wallet for updates.",
    },
  },
  whitepaper: {
    title: "Whitepaper",
    subtitle: "Official 5WA Whitepaper",
    narrative: {
      title: "1. Project Narrative & Vision",
      vanishingBorder: {
        title: "1.1 The Vanishing Border: When Digital Threats Materialize",
        content: "As we move through 2026, the dividends of technological advancement are colliding with unprecedented social friction. We have observed a significant rising trend in physical attacks targeting tech leaders, developers, and cryptocurrency holders. From recent violent assaults on AI industry executives to numerous global reports of illegal detention, home invasions, and extortion targeting Web3 entrepreneurs, the phenomenon known as the \"$5 Wrench Attack\" is no longer an urban legend—it is a stark reality for every participant in the tech ecosystem. Even the most sophisticated firewall cannot protect a vulnerable physical body.",
      },
      whyNow: {
        title: "1.2 Why Now?",
        points: [
          "The Double-Edged Sword of Wealth Transparency: The public nature of the blockchain makes a holder's assets 'visible to the naked eye,' turning them into a prime target for physical crime.",
          "Technological Fear & Social Anxiety: The rapid evolution of AI has sparked hostility among certain groups; tech developers are becoming the 'physical lightning rods' for societal friction.",
          "Severe Imbalance in Protection Layers: Most individuals invest 99% of their energy into digital encryption while remaining completely defenseless against the final 1%—physical security.",
        ],
      },
      mission: {
        title: "1.3 The 5WA Mission: Guarding the Guardians",
        content: "5WA was created to 'establish a defense consensus before violence arrives.' We are dedicated to bringing physical security and privacy de-sensitization education into the Web3 mainstream, protecting those who are actively building the future.",
      },
    },
    coreTokenomics: {
      title: "2. Core Tokenomics",
      items: [
        { label: "Token Name", value: "$5 Wrench Attack" },
        { label: "Ticker", value: "5WA" },
        { label: "Network", value: "BNB Smart Chain (BSC)" },
        { label: "Contract Address", value: "0x392A6a53330fF20D47454BAf76eD6aB0a88571FD" },
        { label: "Genesis Total Supply", value: "8,000,000,000 5WA" },
        { label: "Initial Burn", value: "4,000,000,000 5WA (50% of Genesis Supply)" },
      ],
    },
    allocation: {
      title: "3. Allocation & Trust Mechanisms",
      categories: [
        {
          name: "Genesis Burn",
          amount: "4,000,000,000",
          percentage: "50% of Genesis Supply",
          mechanism: "Transferred to dead address (0x000...dEaD); permanent deflation.",
        },
        {
          name: "Long-Term Trust Lock-up",
          amount: "750,000,000",
          percentage: "75% of Post-Burn Supply",
          mechanism: "24-month (730 days) daily linear unlock via PinkLock, starting January 01, 2027.",
        },
        {
          name: "Initial Circulation",
          amount: "50,000,000",
          percentage: "5% of Post-Burn Supply",
          mechanism: "Allocated for crowdfunding launch and initial market activity.",
        },
        {
          name: "Ecosystem Development Reserve",
          amount: "200,000,000",
          percentage: "20% of Post-Burn Supply",
          mechanism: "Liquidity Provision (10%), Partner Incentives (5%), Dev & Security Audit (5%).",
        },
      ],
    },
    governance: {
      title: "4. Core Governance & Burn Mechanisms",
      trackA: {
        title: "Long-Term Trust Lock-up (75%)",
        description: "750,000,000 tokens locked on PinkLock with daily linear unlock starting January 01, 2027.",
        dailyRelease: "~1,027,397 5WA per day",
        mechanism: "24-month (730 days) daily linear unlock. Tokens are locked on PinkLock platform, verifiable on-chain. This design prevents large-scale dumping and builds long-term price stability.",
      },
      trackB: {
        title: "Ecosystem Development Reserve (20%)",
        description: "200,000,000 tokens for ecosystem growth, liquidity, and security.",
        dailyRelease: "Managed by multi-sig governance",
        mechanism: "Liquidity Provision Fund (10%): 100M | Ecosystem Partner Incentives (5%): 50M | Core Development & Security Audit Reserve (5%): 50M",
      },
      burn: {
        title: "3B Additional Planned Burn",
        description: "3,000,000,000 additional tokens planned for burn via quarterly Multi-Sig governance decisions. Final target: 1B remaining (87.5% total burn from 8B genesis supply).",
        frequency: "Quarterly governance decisions",
        target: "Final target: 1,000,000,000 5WA remaining (87.5% total burn)",
      },
    },
    roadmap: {
      title: "5. Development Roadmap",
      phases: [
        {
          phase: "Phase 1",
          period: "2026 Q2–Q4: MVP Launch & Consensus Initiation",
          items: [
            "Crowdfunding & Initial Liquidity (DODO): Build initial liquidity moat for the $5WA ecosystem.",
            "Multi-Sig Governance Setup: Establish transparent multi-signature governance framework.",
            "AI Risk Engine V1 (Beta): On-chain anomaly detection, basic Personal Risk Scoring.",
            "Web App & Telegram Bot: Launch security alert system for real-time threat notifications.",
          ],
        },
        {
          phase: "Phase 2",
          period: "2027 Q1–Q2: Radar & Empowerment",
          items: [
            "5WA Security Alert Bot V2: Predictive capabilities with Signal/Discord integration.",
            "Privacy Toolkit Launch: Identity de-sensitization, travel mode hardening, wallet risk analysis.",
            "iOS/Android App (Beta): Real-time alerts, risk management, and personalized recommendations.",
            "Panic Button Integration: One-tap emergency response activation.",
          ],
        },
        {
          phase: "Phase 3",
          period: "2027 Q3+: Open Resilience & Decentralized Expansion",
          items: [
            "Deployment of Decentralized Guardian Nodes: Community-operated threat validation network.",
            "Guardian Marketplace: Security services, hardware recommendations, and training resources.",
            "Emergency Insurance Integration: Community-funded coverage for verified physical security incidents.",
            "Advanced AI Threat Intelligence: Enhanced GNNs + LLM for predictive threat modeling.",
          ],
        },
      ],
    },
    conclusion: {
      title: "6. Legal Disclaimer",
      content: "The $5WA token is a functional governance and ecosystem utility token, not a security investment product. The physical security advice and related educational content provided by the project are for reference only and do not constitute any legal advice or guarantee.",
      quote: "The best defense is to render violence useless.",
    },
  },
  footer: {
    copyright: "© 2025 $5 Wrench Attack. All rights reserved.",
    disclaimer:
      "This website is for informational purposes only. It is not financial advice. Always conduct your own research before investing.",
    links: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact",
    },
  },
};

// Export English content as default
export const ENGLISH_CONTENT = contentEN;

// Traditional Chinese Content (kept for reference but not used)
export const contentZH: SiteContent = {
  brand: {
    name: "5美元扳手攻擊",
    shortName: "5WA",
    tagline: "物理安全。數位信任。",
    description: "一個結合物理安全教育與極致代幣經濟學的通縮型代幣專案。",
  },
  navigation: {
    home: "首頁",
    tokenomics: "代幣經濟",
    burnMechanism: "銷毀機制",
    verification: "驗證",
    buyGuide: "購買指南",
    realCases: "案例分享",
    securityGuide: "安全防護指南",
    airdrop: "空投",
    whitepaper: "白皮書",
    language: "語言",
  },
  homepage: {
    hero: {
      title: "5美元扳手攻擊",
      subtitle: "物理安全 × 數位信任",
      description:
        "一個革命性的通縮型代幣專案。\n\n靈感來自網路安全領域著名的『5美元扳手攻擊』概念。無論數位加密多強大，物理威脅仍然真實存在。\n\n我們的使命是建立一個重視隱私、安全和透明度的社群。",
      exploreTokenomics: "探索代幣經濟",
      howToBuy: "如何購買",
    },
    mission: {
      title: "我們的使命",
      content:
        "我們正在建立一個圍繞隱私和安全意識的強大共識。\n\n5美元扳手攻擊代表了最終的真理：數位安全的強度只取決於其物理保護的程度。\n\n我們的代幣專案通過極致的通縮機制和透明的鎖倉機制來體現這一理念。",
    },
    concept: {
      title: "5美元扳手攻擊的含義",
      content:
        "在網路安全領域，『5美元扳手攻擊』是個經典比喻：\n\n某人用簡單工具（如5美元的扳手）物理上破壞系統，輕易繞過所有數位安全措施。\n\n這提醒我們安全是多面向的——既需要數位保護，也需要物理防護。我們的代幣專案正是要結合安全教育和創新的代幣經濟學，讓這個原則深入人心。",
    },
    features: [
      {
        title: "極致通縮",
        description: "已銷毀 25% 的代幣。每月同步銷毀機制保持稀缺性。",
      },
      {
        title: "4 年鎖倉",
        description: "62.5% 的供應量鎖定 4 年，每月線性解鎖。",
      },
      {
        title: "透明驗證",
        description: "區塊鏈驗證的鎖倉證明確保完全透明。",
      },
      {
        title: "安全第一",
        description: "基於物理和數位安全意識原則構建。",
      },
    ],
  },
  tokenomics: {
    title: "代幣經濟",
    subtitle: "極致通縮模型",
    overview: {
      totalSupply: "80 億",
      burned: "20 億（25%）",
      locked: "50 億（62.5%）",
      circulating: "10 億（12.5%）",
    },
    description:
      "我們的代幣經濟模型圍繞極致通縮和長期價值保護而設計。\n\n每個機制都是透明的，並可在區塊鏈上驗證。",
    sections: {
      distribution: {
        title: "代幣分配",
        description:
          "80億的總供應量被戰略性地分配，\n以確保長期可持續性和社群一致性。",
        items: [
          { label: "已銷毀", value: "20 億（25%）", color: "#ef4444" },
          { label: "4 年鎖倉", value: "50 億（62.5%）", color: "#3b82f6" },
          { label: "流通供應量", value: "10 億（12.5%）", color: "#10b981" },
        ],
      },
      lockup: {
        title: "4 年鎖倉機制",
        description:
          "50億代幣鎖定4年，每月線性解鎖。\n每月解鎖鎖定供應量的1/48。",
        monthlyUnlock: "每月約 1.04 億枚代幣",
        totalLocked: "50 億枚代幣",
        lockupPeriod: "48 個月（4 年）",
      },
    },
  },
  burnMechanism: {
    title: "每月銷毀機制",
    subtitle: "同步通縮模型",
    description:
      "為了保持稀缺性並回饋持有者，我們實施同步銷毀機制：每月解鎖代幣時，我們同時銷毀該月解鎖量的 1%。",
    mechanism: {
      title: "運作方式",
      steps: [
        {
          number: 1,
          title: "每月解鎖",
          description: "每月 1 日，約 1.04 億枚代幣從 4 年鎖倉中解鎖。",
        },
        {
          number: 2,
          title: "同步銷毀",
          description: "解鎖後立即銷毀該月解鎖量的 1%。",
        },
        {
          number: 3,
          title: "供應量減少",
          description: "每月約 104 萬枚代幣被永久移出流通。",
        },
        {
          number: 4,
          title: "持有者受益",
          description: "供應量減少增加稀缺性，使所有代幣持有者受益。",
        },
      ],
      monthlyBurn: "每月約 104 萬枚代幣",
      annualBurn: "每年約 1,250 萬枚代幣",
      totalBurnOver4Years: "4 年內約 6 億枚代幣",
    },
    impact: {
      title: "隨時間的影響",
      description:
        "在 4 年鎖倉期間，每月銷毀機制將從流通中移除約 6 億枚代幣，進一步將總供應量從 80 億減少到約 74 億。",
      projection: [
        { period: "第 1 年", burnedTokens: "1,250 萬", totalSupply: "79.875 億" },
        { period: "第 2 年", burnedTokens: "2,500 萬", totalSupply: "79.75 億" },
        { period: "第 3 年", burnedTokens: "3,750 萬", totalSupply: "79.625 億" },
        { period: "第 4 年", burnedTokens: "5,000 萬", totalSupply: "79.5 億" },
      ],
    },
  },
  verification: {
    title: "區塊鏈驗證",
    subtitle: "透明鎖倉證明",
    description:
      "所有代幣鎖倉和銷毀機制都可在區塊鏈上驗證。我們相信完全透明。點擊下方連結在主要區塊鏈瀏覽器上驗證我們的鎖倉狀態。",
    verificationLinks: [
      {
        title: "5WA 代幣合約",
        description: "在 BNB Smart Chain 上驗證 5WA 代幣合約",
        address: "0x392A6a53330fF20D47454BAf76eD6aB0a88571FD",
        network: "BNB Smart Chain (BSC)",
        explorer: "https://bscscan.com/token/0x392A6a53330fF20D47454BAf76eD6aB0a88571FD",
      },
      {
        title: "銷毀地址",
        description: "驗證銷毀地址上的所有已銷毀代幣",
        address: "0x000000000000000000000000000000000000dEaD",
        network: "BNB Smart Chain (BSC)",
        explorer: "https://bscscan.com/address/0x000000000000000000000000000000000000dEaD",
      },
      {
        title: "多簽治理錢包",
        description: "驗證用於戰略銷毀的多簽治理錢包",
        address: "0xc3cbdfE9766D446B300e30144C73eb5c3Ab69c08",
        network: "BNB Smart Chain (BSC)",
        explorer: "https://bscscan.com/address/0xc3cbdfE9766D446B300e30144C73eb5c3Ab69c08",
      },
      {
        title: "PinkLock 鎖倉記錄（749,999,390 5WA）",
        description: "透過 PinkSale PinkLock V2 驗證 24 個月線性解鎖計劃",
        address: "PinkLock Record #1653235",
        network: "BNB Smart Chain (BSC)",
        explorer: "https://www.pinksale.finance/pinklock/bsc/record/1653235",
      },
      {
        title: "戰略銷毀 Tx 1 — 500,000,000 5WA",
        description: "戰略銷毀交易 1：5 億代幣從多簽錢包發送至銷毀地址",
        address: "0x4249523a33a7cccf23472ff63d8c7f0516ff233f02b2471aab6a41f2274d6279",
        network: "BNB Smart Chain (BSC)",
        explorer: "https://bscscan.com/tx/0x4249523a33a7cccf23472ff63d8c7f0516ff233f02b2471aab6a41f2274d6279",
      },
      {
        title: "戰略銷毀 Tx 2 — 2,500,000,000 5WA",
        description: "戰略銷毀交易 2：25 億代幣從多簽錢包發送至銷毀地址",
        address: "0x6b49448610903b64bf57eee82166477be03bf2c6d168c832a38c3156cf78de2b",
        network: "BNB Smart Chain (BSC)",
        explorer: "https://bscscan.com/tx/0x6b49448610903b64bf57eee82166477be03bf2c6d168c832a38c3156cf78de2b",
      },
    ],
    burnHistory: {
      title: "銷毀歷史",
      description: "追蹤所有銷毀事件並驗證銷毀進度",
      events: [
        { date: "2026-Q2（創世銷毀）", amount: "4,000,000,000 5WA", txHash: "0xe506b4cf07afa63c8ca8a8bcac962477957357196014c15daecb7757072c3f4e" },
        { date: "2026-Q2（戰略銷毀 Tx 1）", amount: "500,000,000 5WA", txHash: "0x4249523a33a7cccf23472ff63d8c7f0516ff233f02b2471aab6a41f2274d6279" },
        { date: "2026-Q2（戰略銷毀 Tx 2）", amount: "2,500,000,000 5WA", txHash: "0x6b49448610903b64bf57eee82166477be03bf2c6d168c832a38c3156cf78de2b" },
      ],
    },
  },
  buyGuide: {
    title: "如何購買 5WA",
    subtitle: "分步購買指南",
    introduction:
      "按照以下步驟購買 5美元扳手攻擊代幣。這個過程簡單且安全。",
    steps: [
      {
        number: 1,
        title: "設置錢包",
        description:
          "下載並安裝 Web3 錢包，如 MetaMask、Trust Wallet 或 WalletConnect。創建新錢包或導入現有錢包。",
        details: [
          "從 https://metamask.io 下載 MetaMask",
          "創建新錢包並安全保存您的助記詞",
          "向錢包添加資金（ETH 或 USDT）",
        ],
      },
      {
        number: 2,
        title: "連接到 DEX",
        description:
          "訪問去中心化交易所 (DEX)，如 Uniswap、SushiSwap 或 1inch。將您的錢包連接到該平台。",
        details: [
          "前往 https://uniswap.org（或您偏好的 DEX）",
          "點擊「連接錢包」並選擇您的錢包類型",
          "在您的錢包中批准連接",
        ],
      },
      {
        number: 3,
        title: "搜索 5WA 代幣",
        description:
          "搜索 5美元扳手攻擊代幣合約地址。驗證代幣詳情以確保真實性。",
        details: [
          "合約地址：0x5WA5WA5WA5WA5WA5WA5WA5WA5WA5WA5WA5WA5WA",
          "驗證代幣名稱和符號與官方來源相符",
          "檢查流動性和交易量",
        ],
      },
      {
        number: 4,
        title: "輸入購買金額",
        description:
          "指定您想用 ETH 或 USDT 交換多少 5WA 代幣。查看匯率和滑點。",
        details: [
          "輸入您想花費的 ETH/USDT 金額",
          "查看您將收到的估計 5WA 代幣數量",
          "設置滑點容差（通常為 0.5-1%）",
        ],
      },
      {
        number: 5,
        title: "批准交易",
        description:
          "查看交易詳情並在您的錢包中批准。注意燃氣費。",
        details: [
          "查看所有交易詳情",
          "確認燃氣費可接受",
          "在您的錢包中點擊「批准」",
        ],
      },
      {
        number: 6,
        title: "完成購買",
        description:
          "確認交換交易。您的 5WA 代幣將在幾秒內出現在您的錢包中。",
        details: [
          "點擊「交換」或「確認」以完成交易",
          "等待交易在區塊鏈上確認",
          "您的 5WA 代幣將出現在您的錢包中",
        ],
      },
      {
        number: 7,
        title: "保護您的代幣",
        description:
          "將您的代幣轉移到安全的存儲解決方案。對於大額，考慮使用硬體錢包。",
        details: [
          "將代幣保留在您的錢包中或轉移到冷存儲",
          "永遠不要分享您的私鑰或助記詞",
          "對於大額持有，考慮使用硬體錢包（Ledger、Trezor）",
        ],
      },
    ],
    tips: {
      title: "重要提示",
      items: [
        "購買前始終驗證官方合約地址",
        "先用小額測試該過程",
        "使用 0.5-1% 的滑點設置以避免交易失敗",
        "注意燃氣費和市場條件",
        "永遠不要與任何人分享您的私鑰或助記詞",
        "對於大額持有，考慮使用硬體錢包",
      ],
    },
    risks: {
      title: "風險免責聲明",
      content:
        "加密貨幣投資具有重大風險。代幣價值可能會大幅波動。只投資您能承受損失的金額。在做出投資決定前進行自己的研究 (DYOR) 並諮詢財務顧問。",
    },
  },
  realCases: {
    title: "案例分享",
    subtitle: "為什麼物理安全很重要",
    description:
      "這些是加密貨幣持有者遭遇物理攻擊、綁架和勒索的真實案例。他們的故事強調了物理安全與數位安全同樣重要。我們分享這些案例是為了提高認識，強調沒有任何數位加密能夠保護免受物理威脅。",
    cases: [
      {
        id: "case-1",
        title: "加拿大 200 萬美元比特幣人質事件",
        description:
          "一個加拿大家庭被四名入侵者挾持一整夜，遭受水刑、性侵犯和死亡威脅。攻擊者竊取了約 200 萬美元的加密貨幣。",
        date: "2025 年 11 月",
        location: "加拿大不列顛哥倫比亞省",
        amount: "200 萬美元",
        severity: "critical",
        source: "CBC 新聞、Fortune 雜誌",
        sourceUrl: "https://www.cbc.ca/news/canada/british-columbia/bitcoin-hostage-millions-cryptocurrency-9.6987994",
        details: [
          "4 名入侵者入侵家庭",
          "受害者遭受水刑和性侵犯",
          "使用死亡威脅強迫加密貨幣轉帳",
          "約 200 萬美元的加密貨幣被竊取",
        ],
      },
      {
        id: "case-2",
        title: "紐約加密貨幣綁架和刑訊逼供案",
        description:
          "兩名男子因在曼哈頓公寓內綁架和刑訊逼供比特幣投資者而被起訴。他們針對富有的加密貨幣持有者，使用極端暴力強迫他們透露數位資產。",
        date: "2025 年 5 月",
        location: "紐約曼哈頓",
        amount: "多名受害者",
        severity: "critical",
        source: "ABC 新聞、衛報",
        sourceUrl: "https://abcnews.com/US/nyc-crypto-kidnapping-torture-case/story?id=122280419",
        details: [
          "犯人：John Woeltz（37 歲）和 William Duplessie（33 歲）",
          "使用刑訊逼供提取加密貨幣訪問權限",
          "針對曼哈頓富有的加密貨幣投資者",
          "多名受害者遭受暴力",
        ],
      },
      {
        id: "case-3",
        title: "伯納爾高地家庭入侵 - 300 萬美元盜竊案",
        description:
          "一名蒙面入侵者在白天闖入一名女性的家中，竊取了 300 萬美元的加密貨幣。這個案例表明犯罪分子如何根據已知的財富專門針對加密貨幣持有者。",
        date: "2022 年 3 月 16 日",
        location: "舊金山伯納爾高地",
        amount: "300 萬美元",
        severity: "high",
        source: "SF Standard",
        sourceUrl: "https://sfstandard.com/2026/01/10/ski-mask-knife-ipad-3-million-crypto-heist/",
        details: [
          "白天家庭入侵",
          "蒙面犯人使用刀和 iPad",
          "300 萬美元的加密貨幣被竊取",
          "受害者在攻擊時獨自在家",
        ],
      },
      {
        id: "case-4",
        title: "斯科茨代爾家庭入侵 - 6,600 萬美元加密貨幣計畫",
        description:
          "兩名加州青少年因在斯科茨代爾進行有針對性的家庭入侵而被逮捕，該入侵與涉及 6,600 萬美元的加密貨幣搶劫計畫有關。這個案例表明加密貨幣犯罪分子跨越所有年齡段。",
        date: "2026 年 2 月",
        location: "亞利桑那州斯科茨代爾",
        amount: "6,600 萬美元",
        severity: "high",
        source: "Fox 10 Phoenix、Fox News",
        sourceUrl: "https://www.fox10phoenix.com/news/targeted-scottsdale-home-invasion-linked-alleged-66m-cryptocurrency-plot",
        details: [
          "兩名青少年犯人",
          "為了犯罪而行駛 600 英里",
          "有針對性的家庭入侵",
          "與 6,600 萬美元加密貨幣計畫有關",
        ],
      },
      {
        id: "case-5",
        title: "香港 160 萬美元比特幣搶劫案",
        description:
          "一名香港男子因暴力家庭入侵而被判 7 年監禁，該入侵導致 160 萬美元比特幣被盜。攻擊包括性侵犯和極端暴力。",
        date: "2025 年 11 月",
        location: "香港",
        amount: "160 萬美元",
        severity: "critical",
        source: "NY Post",
        sourceUrl: "https://nypost.com/2025/11/24/business/crypto-thieves-waterboarded-sexually-assaulted-family-in-1-6m-heist/",
        details: [
          "犯人被判 7 年監禁",
          "家庭入侵伴隨極端暴力",
          "性侵犯發生在搶劫期間",
          "160 萬美元比特幣被竊取",
        ],
      },
      {
        id: "case-6",
        title: "爾灣連環搶劫團夥 - 多名加密貨幣所有者",
        description:
          "一個由 7 名成員組成的搶劫團夥通過暴力家庭入侵針對爾灣的多名加密貨幣所有者。所有犯人最終被逮捕。",
        date: "2025 年 9 月",
        location: "加州爾灣",
        amount: "多名受害者",
        severity: "high",
        source: "當地新聞報導",
        sourceUrl: "https://www.youtube.com/watch?v=sA6D3UuQAZI",
        details: [
          "7 人搶劫團夥",
          "多次家庭入侵",
          "針對加密貨幣所有者",
          "所有犯人在 2025 年 12 月前被逮捕",
        ],
      },
      {
        id: "case-7",
        title: "前洛杉磯警察局警官加密貨幣盜竊案",
        description:
          "一名前洛杉磯警察局警官因綁架和搶劫罪名被定罪，他竊取了 35 萬美元的加密貨幣。這個案例突出了犯罪分子如何利用信任和權力地位。",
        date: "2026 年 3 月",
        location: "加州洛杉磯",
        amount: "35 萬美元",
        severity: "high",
        source: "幣安新聞",
        sourceUrl: "https://www.binance.com/en/square/post/297669894492353",
        details: [
          "犯人：前 LAPD 警官 Eric Halem",
          "濫用執法權力",
          "綁架和搶劫指控",
          "35 萬美元加密貨幣被竊取",
        ],
      },
      {
        id: "case-8",
        title: "馬德里綁架未遂 - 加拿大加密貨幣企業家",
        description:
          "一名加拿大加密貨幣企業家在馬德里遭遇綁架未遂，在目擊者報警後倖免於難。攻擊者使用紮帶、安眠藥和辣椒噴霧進行綁架和勒索。",
        date: "最近（2026 年 3 月）",
        location: "西班牙馬德里",
        amount: "勒索未遂",
        severity: "critical",
        source: "KuCoin News",
        sourceUrl: "https://www.kucoin.com/news/flash/canadian-crypto-entrepreneur-kidnapped-in-madrid-for-btc-and-private-keys",
        details: [
          "受害者：加拿大加密貨幣企業家",
          "武器：紮帶、安眠藥、辣椒噴霧",
          "因目擊者干預而倖免於難",
          "加密貨幣犯罪的國際範圍",
        ],
      },
    ],
  },
  securityGuide: {
    title: "安全防護指南",
    subtitle: "保護你的資產的實用措施",
    introduction: "物理安全與數位安全一樣重要。本指南提供了實用的步驟来保護你自己、你的身份和你的加密資產不會遇到物理威肅和有針對性的攻擊。",
    sections: [
      {
        id: "identity-protection",
        title: "身份與隐私保護",
        description: "防止罪犯將你的真實身份與加密資產關聯起來。",
        tips: [
          {
            title: "維持操作安全性 (OPSEC)",
            content: "不要在公開或社交媒體上討論你的加密資產。不要提及特定的金題、交易所或錢包詳詳。在網上使用化名，將你的加密身份與真實身份分開。",
          },
          {
            title: "不要為財富為荣",
            content: "不要羅列你的投資、奇很購買或生活方式的改變。罪犯經常以公開為財的人為目標。在重大收益或牛市期間要特別小心。",
          },
          {
            title: "使用不追蹤隐私保護服務",
            content: "使用 VPN、Tor 瀏覽器和隐私保護的電子郵件服務。通過隐私保護服務註冊網域名稱和商業實體。使用一次性手機進行敏感通信。",
          },
          {
            title: "分開身份",
            content: "為不同的目的維持分開的電子郵件地址、電話號碼和設備。在不同平台上使用不同的用戶名。不要將你的加密購買賬戶與你的社交媒體水水相連。",
          },
        ],
      },
      {
        id: "physical-security",
        title: "物理安全措施",
        description: "實施實用的安全措施以保護你的物理資產和个人安全。",
        tips: [
          {
            title: "多重簽名錢包",
            content: "使用多重簽名 (multisig) 錢包，需要多個私鑰來授權交易。將私鑰存放在不同的物理位置。需要 2-of-3 或 3-of-5 簽名以授權大題交易。",
          },
          {
            title: "硬體錢包安全",
            content: "使用硬體錢包 (Ledger, Trezor) 進行長期存儲。將硬體錢包存放在保隨箱或安全位置。不要將錢包罫罫放罫或讓客人看到。",
          },
          {
            title: "分散存儲",
            content: "不要將所有資產存放在一個位置。將資產分散到多個錢包、交易所和物理位置。使用地理上的多样性來減輕位置特定的風險。",
          },
          {
            title: "家庭安全",
            content: "安裝安全系統、攀頭和警報系統。使用加固的門窗。與鄰居保持良好關係。考慮安全照明和景觀設計，防止有藱可伊。",
          },
        ],
      },
      {
        id: "social-media-safety",
        title: "社交媒體與數位隐私",
        description: "保護你的網上存在並防止信息通過數位渠道洩漏。",
        tips: [
          {
            title: "限制公開信息",
            content: "將社交媒體賬戶設置為私密。不要分享你的位置、工作地址或日常日程。不要為照片標記位置。不要宣布旅行計劃或長期缺席。",
          },
          {
            title: "避免加密社群",
            content: "在網上加密社群中要小心。不要分享你的投資組合或交易歷史。不要參與揭露你的財富或資產的討論。為加密討論使用分開賬戶。",
          },
          {
            title: "電子郵件安全",
            content: "為所有賬戶使用強大、獨特的密碼。在所有重要賬戶上啟用雙因素驗證 (2FA)。盡可能使用驗證器應用而不是短信。定期監控賬戶活動。",
          },
          {
            title: "防止鵚魚式攻擊",
            content: "不要點擊不請自来的電子郵件或消息中的鏈接。在輸入敏感信息前驗證 URL。使用密碼管理器以避免在假网站上輸入凭證。對緊急請求保持警惕。",
          },
        ],
      },
      {
        id: "threat-response",
        title: "對物理威肅的應對",
        description: "如果你面臨物理威肅或被迫的策略。",
        tips: [
          {
            title: "記齐錢包",
            content: "維持記齐錢包，裡面存放少量加密資產。如果遭到威肅，你可以交出記齐錢包以獲得時間或滿足攻擊者。定期更新記齐錢包以使其看起来是活跃的。",
          },
          {
            title: "延遅訪得協議",
            content: "設置時間鎖定交易或延遅提取設定。配置賬戶以需要電子郵件確認才能提取。使用允許時間安排交易的服務。",
          },
          {
            title: "緊急聯繡",
            content: "與可信任的聯繡人建立安全的溝通渠道。為緊急情況建立暗語。與家庭成員分享緊急程序。保持緊急聯繡信息的可訪但安全。",
          },
          {
            title: "優先保護个人安全",
            content: "你的生命比你的資產更有价值。如果遭到威肅，依照要求提供資產。立即聯繡執法機構。如果受傷，尋求醫療救治。为警察調查保留證據。",
          },
        ],
      },
      {
        id: "travel-safety",
        title: "旅行與日常生活安全",
        description: "在旅行和日常活動中保持安全意識。",
        tips: [
          {
            title: "旅行預防措施",
            content: "不要携帶大量加密資產或硬體錢包旅行。使用安全的溝通渠道。告訴信任的聯繡人你的旅行計劃。不要與陳人討論你的財富或資產。",
          },
          {
            title: "情形意識",
            content: "時刻注意你的上下文。注意追蹤你或不尋常的行為的人。改變你的日常例窗。不要遵後可預測的模式。盡信你對可疑情況的直覺。",
          },
          {
            title: "車輛安全",
            content: "一直鎖好你的車輛。將車輛停放在照明良好、可見的地方。不要將貴重物品罫放在車上。使用防盜装置。接近你的車輛時要小心。",
          },
          {
            title: "會面安全",
            content: "在公開場所會面。帶一位信任的同伴。告訴他人你的位置和預計回來的時間。使用安全的溝通渠道。不要與網上陳人會面。",
          },
        ],
      },
    ],
  },
  airdrop: {
    title: "5WA 空投",
    subtitle: "第一季：物理安全基礎",
    description: "測試您對 Web3 參與者面臨的物理安全威脅的知識。回答 6 個關於物理脅迫和社會工程攻擊向量的問題，根據分數賺取 5WA 代幣。",
    narrative: {
      title: "我們為什麼要如此謹慎地設計 $5WA 機制？",
      content: "正如此測驗所示，真正的安全來自於**知識與準備**。\n\n• 我們的 24 個月線性解鎖 = 物理防禦中的「時間緩衝」。\n• 我們的 87.5% 代幣銷毀 = 減少系統的「攻擊面」。\n• 我們的去中心化財庫管理 = 物理層面的「多簽防禦」。\n\n$5WA：在 AGI 時代保護您的物理安全共識。\n\n這是季節性教育活動。未來季度將涵蓋 $5WA 白皮書中的不同威脅向量，包括供應鏈攻擊、旅行與地理位置風險以及進階 OpSec。",
    },
    privacy: "此評估不收集任何個人數據。您的隱私是我們的優先事項。",
    checklist: {
      title: "安全知識測驗",
      stages: [
        {
          title: "物理脅迫與威脅意識",
          items: [
            {
              id: "q1",
              text: "Q1: 在加密貨幣脈絡中，「5美元扳手攻擊」是什麼？\nA) 使用閃電貸的 DeFi 漏洞\nB) 有人以暴力威脅你交出加密密鑰的物理攻擊\nC) 偽裝成硬體錢包更新的釣魚郵件\nD) 智能合約漏洞",
            },
            {
              id: "q2",
              text: "Q2: 您在國際旅行時被海關攔下。他們要求您解鎖手機並展示加密錢包。最佳的旅行前準備是什麼？\nA) 拒絕並冒被拘留的風險\nB) 展示所有內容以避免麻煩\nC) 使用「旅行模式」— 僅在設備上保留最小錢包，主要資產存在別處的硬體錢包\nD) 永久刪除所有加密應用",
            },
            {
              id: "q3",
              text: "Q3: 一個陌生人在加密聚會上問「你持有多少比特幣？」最安全的回應是？\nA) 告訴他們確切持倉以建立信任\nB) 展示您的投資組合應用\nC) 轉移話題或給出模糊答案 — 永遠不要透露具體持倉\nD) 告訴他們你只持有 meme 幣",
            },
          ],
        },
        {
          title: "社會工程與操作安全",
          items: [
            {
              id: "q4",
              text: "Q4: 您收到一條來自「交易所客服」的私訊，要求您驗證助記詞。這是什麼的例子？\nA) 合法的客戶服務\nB) 社會工程攻擊\nC) 鏈上分析\nD) 多簽驗證",
            },
            {
              id: "q5",
              text: "Q5: 「脅迫錢包」（誘餌錢包）的主要目的是什麼？\nA) 以額外加密存儲主要持倉\nB) 擁有一個可在物理威脅下交出的犧牲錢包，保護真實資產\nC) 向當局隱藏非法交易\nD) 賺取更高的質押獎勵",
            },
            {
              id: "q6",
              text: "Q6: $5WA 推薦作為第一道防線的物理安全實踐是什麼？\nA) 僱用武裝保鏢\nB) 永遠不參加任何加密活動\nC) 操作安全（OpSec）— 最小化可見的加密足跡並分離身份\nD) 將所有加密貨幣存在中心化交易所",
            },
          ],
        },
      ],
    },
    scoring: {
      title: "您的安全知識",
      tiers: [
        {
          stars: "0-1",
          level: "脆弱",
          message: "您需要更多了解 Web3 中的物理安全威脅。5美元扳手攻擊是真實且日益增長的危險。",
          suggestion: "閱讀 $5WA 白皮書和安全指南以了解威脅環境。",
        },
        {
          stars: "2-3",
          level: "有意識",
          message: "您對物理安全威脅有基本認知，但仍存在可能被利用的重大漏洞。",
          suggestion: "研究真實攻擊案例並實施基本 OpSec 協議。",
        },
        {
          stars: "4-5",
          level: "有知識",
          message: "您具有堅實的安全知識基礎，僅有少量弱點。您了解大多數攻擊向量。",
          suggestion: "專注於實施脅迫錢包和旅行模式協議。",
        },
        {
          stars: "6",
          level: "守護者",
          message: "優秀！您展示了對物理安全威脅和對策的完整理解。您的思維如同 $5WA Guardian。",
          suggestion: "與社群分享您的知識，幫助他人保持安全。",
        },
      ],
    },
    rewards: {
      title: "代幣獎勵",
      description: "根據測驗分數賺取 5WA 代幣：",
      perStar: "每個正確答案依題目難度獲得 100–200 5WA",
      bonus: "滿分 (6/6) = 最高 1,000 5WA 獎勵",
    },
    sharing: {
      title: "分享您的成就",
      button: "在 X 上分享",
      tweetTemplate: "我在 $5WA 第一季物理安全測驗中得到了 {score}/6 分！您對 Web3 參與者面臨的威脅了解多少？在 5wa.io/airdrop 參加測驗 #5WA #物理安全",
    },
    wallet: {
      title: "領取空投",
      label: "BSC 錢包地址",
      placeholder: "0x...",
      error: "請輸入有效的 BSC 錢包地址（以 0x 開頭）",
      counter: "參與者",
      maxParticipants: "最多 2000 名參與者",
    },
    submit: {
      button: "提交並領取",
      success: "提交成功！",
      successMessage: "感謝您完成 $5WA 第一季測驗！您的 {amount} 5WA 代幣將在季度結束後（2026年9月30日）發放。請檢查您的錢包。",
    },
  },
  whitepaper: {
    title: "白皮書",
    subtitle: "官方 5WA 白皮書",
    narrative: {
      title: "1. 項目敘述與願景",
      vanishingBorder: {
        title: "1.1 消失的邊界：數位威脅的物理化",
        content: "進入 2026 年，科技進步的紅利與前所未有的社會摩擦相遇。我們親眼目睹了針對科技領袖、開發者和加密貨幣持有者的物理攻擊急加上升的趨勢。從最近的 AI 產業高管暗殺事件到全球許多針對 Web3 企業家的非法拘禁、入室搶劫和勒索事件，被稱為「5美元扳手攻擊」的現象已不是都市傳說—它是每個科技生況參與者的住實。即使是最精密的防火牆也無法保護一個脆弱的身體。",
      },
      whyNow: {
        title: "1.2 為什麼是現在？",
        points: [
          "財富透明化的雙刃劍：區塊鏈的公開性使持有者的資產『赤裸裸地暴露』，使其成為物理犯罪的第一目標。",
          "科技恐慌與社會焦慮：AI 的快速演進已引發某些群體的敵意；科技開發者正成為社會摩擦的『物理需電針』。",
          "保護層次的嚴重失衡：大多數人將 99% 的精力投入數位加密，卻對最後 1% 的物理安全完全不設防。",
        ],
      },
      mission: {
        title: "1.3 5WA 的使命：保護保護者",
        content: "5WA 的創立是為了『在暗殺來臨前建立防空共識』。我們致力於將物理安全和隱私去敏感化教育帶入 Web3 主流，保護正在竭力構策未來的每一個人。",
      },
    },
    coreTokenomics: {
      title: "2. 核心代幣經濟學",
      items: [
        { label: "代幣名稱", value: "$5 Wrench Attack" },
        { label: "代幣符號", value: "5WA" },
        { label: "網絡", value: "BNB Smart Chain (BSC)" },
        { label: "合約地址", value: "0x392a6a53330ff20d47454baf76ed6ab0a88571fd" },
        { label: "初始總供應量", value: "8,000,000,000 5WA" },
        { label: "初始銷毀", value: "4,000,000,000 5WA (創世供應量的 50%)" },
      ],
    },
    allocation: {
      title: "3. 分配與信任機制",
      categories: [
        {
          name: "起源銷毀",
          amount: "4,000,000,000",
          percentage: "創世供應量的 50%",
          mechanism: "轉入死亡地址 (0x000...dEaD)；永久通縮。",
        },
        {
          name: "長期信任鎖倉",
          amount: "750,000,000",
          percentage: "燒毀後供應量的 75%",
          mechanism: "透過 PinkLock 進行 24 個月 (730 天) 每日線性解鎖，從 2027 年 1 月 1 日開始。",
        },
        {
          name: "初始流通",
          amount: "50,000,000",
          percentage: "燒毀後供應量的 5%",
          mechanism: "用於眾籌啟動和初始市場活動。",
        },
        {
          name: "生態系統發展儲備",
          amount: "200,000,000",
          percentage: "燒毀後供應量的 20%",
          mechanism: "流動性供應 (10%)、合作夥伴激勵 (5%)、核心開發與安全審計 (5%)。",
        },
      ],
    },
    governance: {
      title: "4. 核心治理與銷毀機制",
      trackA: {
        title: "長期信任鎖倉 (75%)",
        description: "7.5 億代幣透過 PinkLock 鎖倉，從 2027 年 1 月 1 日開始每日線性解鎖。",
        dailyRelease: "每日約 1,027,397 5WA",
        mechanism: "24 個月 (730 天) 每日線性解鎖。代幣鎖倉於 PinkLock 平台，可在鏈上驗證。此設計防止大規模拋售，建立長期價格穩定性。",
      },
      trackB: {
        title: "生態系統發展儲備 (20%)",
        description: "2 億代幣用於生態系統成長、流動性和安全。",
        dailyRelease: "由多簽治理管理",
        mechanism: "流動性供應基金 (10%): 1億 | 生態合作夥伴激勵 (5%): 5千萬 | 核心開發與安全審計 (5%): 5千萬。",
      },
      burn: {
        title: "4.2 季度戰略性銷毀",
        description: "以初始總供應量的 90% 總減少為目標 (最終目標：800M - 1B 5WA)。",
        frequency: "每季度執行一次 (每三個月)",
        target: "90% 總減少 (最終目標：800M - 1B 5WA)",
      },
    },
    roadmap: {
      title: "5. 開發路線圖",
      phases: [
        {
          phase: "第 1 階段",
          period: "2026 Q2 - Q4: 共識起動與深入教育",
          items: [
            "安全韌性空投 (Q2)：啟動互動式『Web3 物理安全評估』。只有通過評估的人才能領取空投，篩選高質量的共識持有者。",
            "官方入口網站啟動 (Q3)：建立 5WA 網站，提供開放源『Web3 物理安全 Wiki』。",
            "專業驗證 (Q4)：完成 BscScan 專業標籤驗證並啟動線性解鎖的透明監控。",
          ],
        },
        {
          phase: "第 2 階段",
          period: "2027 Q1 - Q2: 雷達工具與物理權能",
          items: [
            "公開安全警報機器人：啟動 5WA 雷達機器人，整合物理威脅情報和地理風險警告給全球科技社群。",
            "功能訪問：代幣持有者可解鎖『個人隱私去敏感化工具組』和高級物理防空操作步驟。",
            "中立安全認證：提供非營利性安全標準指南，提高社群物理防空的基準。",
          ],
        },
        {
          phase: "第 3 階段",
          period: "2027 Q3+: 開放韌性與社會影響",
          items: [
            "去中心化警報節點：允許社群成員提供驗證的安全情報以交換 5WA 獎勵。",
            "安全徽章系統：實施物理安全級別評估，用於科技友善物理空間。",
          ],
        },
      ],
    },
    conclusion: {
      title: "6. 結論",
      content: "5WA 是對我們時代痛點的專業回應。我們不追求表面泡沫；我們尋求保護每個在數位浪潮中前赴的人。",
      quote: "最好的防空不是最複雜的代碼，而是讓暗殺對你一無是處。",
    },
  },
  footer: {
    copyright: "© 2024 5美元扳手攻擊。版權所有。",
    disclaimer:
      "本網站僅供參考。不構成財務建議。投資前請進行自己的研究。",
    links: {
      privacy: "隱私政策",
      terms: "服務條款",
      contact: "聯絡我們",
    },
  },
};

// Get content by language
export function getContent(language: Language): SiteContent {
  return language === 'zh' ? contentZH : contentEN;
}
