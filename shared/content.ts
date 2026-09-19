/**
 * 5WA Token - All website content and copy
 * Centralized content management for homepage, pages, and components
 */

export const siteContent = {
  // Brand & Navigation
  brand: {
    name: "$5 Wrench Attack",
    shortName: "5WA",
    tagline: "Physical Security. Digital Trust.",
    description: "A deflationary token project combining physical security education with extreme tokenomics.",
  },

  // Navigation
  navigation: {
    home: "Home",
    tokenomics: "Tokenomics",
    burnMechanism: "Burn Mechanism",
    verification: "Verification",
    buyGuide: "How to Buy",
  },

  // Homepage Content
  homepage: {
    hero: {
      title: "$5 Wrench Attack",
      subtitle: "Where Physical Security Meets Digital Trust",
      description:
        "A revolutionary deflationary token project inspired by the famous \"$5 Wrench Attack\" concept in cybersecurity. We believe that no matter how strong your digital encryption is, physical threats remain real. Our mission is to build a community that values privacy, security, and transparency.",
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
        title: "Extreme Deflation",
        description: "25% of tokens already burned. Monthly synchronized burn mechanism maintains scarcity.",
      },
      {
        title: "4-Year Lock-Up",
        description: "62.5% of supply locked for 4 years with linear monthly unlocks.",
      },
      {
        title: "Transparent Verification",
        description: "Blockchain-verified lock-up proofs ensure complete transparency.",
      },
      {
        title: "Security First",
        description: "Built on principles of physical and digital security awareness.",
      },
    ],
  },

  // Tokenomics Page
  tokenomics: {
    title: "Token Economics",
    subtitle: "Extreme Deflation Model",
    overview: {
      totalSupply: "8 Billion",
      burned: "2 Billion (25%)",
      locked: "5 Billion (62.5%)",
      circulating: "1 Billion (12.5%)",
    },
    description:
      "Our tokenomics model is designed around extreme deflation and long-term value preservation. Every mechanism is transparent and verifiable on the blockchain.",
    sections: {
      distribution: {
        title: "Token Distribution",
        description:
          "The 8 billion total supply is strategically distributed to ensure long-term sustainability and community alignment.",
        items: [
          { label: "Already Burned", value: "2B (25%)", color: "#ef4444" },
          { label: "4-Year Lock-Up", value: "5B (62.5%)", color: "#3b82f6" },
          { label: "Circulating Supply", value: "1B (12.5%)", color: "#10b981" },
        ],
      },
      lockup: {
        title: "4-Year Lock-Up Mechanism",
        description:
          "5 billion tokens are locked for 4 years with linear monthly unlocks. Each month, 1/48th of the locked supply becomes available.",
        monthlyUnlock: "~104.17 Million tokens per month",
        totalLocked: "5 Billion tokens",
        lockupPeriod: "48 months (4 years)",
      },
    },
  },

  // Burn Mechanism Page
  burnMechanism: {
    title: "Monthly Burn Mechanism",
    subtitle: "Synchronized Deflation Model",
    description:
      "To maintain scarcity and reward holders, we implement a synchronized burn mechanism: each month when tokens are unlocked, we simultaneously burn 1% of that month's unlocked amount.",
    mechanism: {
      title: "How It Works",
      steps: [
        {
          number: 1,
          title: "Monthly Unlock",
          description: "On the 1st of each month, ~104.17 million tokens are unlocked from the 4-year lock-up.",
        },
        {
          number: 2,
          title: "Synchronized Burn",
          description: "Immediately upon unlock, 1% of that month's unlocked tokens are burned.",
        },
        {
          number: 3,
          title: "Supply Reduction",
          description: "Each month, ~1.04 million tokens are permanently removed from circulation.",
        },
        {
          number: 4,
          title: "Holder Benefit",
          description: "Reduced supply increases scarcity, benefiting all token holders.",
        },
      ],
      monthlyBurn: "~1.04 Million tokens per month",
      annualBurn: "~12.5 Million tokens per year",
      totalBurnOver4Years: "~600 Million tokens",
    },
    impact: {
      title: "Impact Over Time",
      description:
        "Over the 4-year lock-up period, the monthly burn mechanism will remove approximately 600 million tokens from circulation, further reducing the total supply from 8 billion to approximately 7.4 billion.",
      projection: [
        { period: "Year 1", burnedTokens: "12.5M", totalSupply: "7.9875B" },
        { period: "Year 2", burnedTokens: "25M", totalSupply: "7.975B" },
        { period: "Year 3", burnedTokens: "37.5M", totalSupply: "7.9625B" },
        { period: "Year 4", burnedTokens: "50M", totalSupply: "7.95B" },
      ],
    },
  },

  // Verification Page
  verification: {
    title: "Blockchain Verification",
    subtitle: "Transparent Lock-Up Proof",
    description:
      "All token lock-ups and burn mechanisms are verifiable on the blockchain. We believe in complete transparency. Click the links below to verify our lock-up status on major blockchain explorers.",
    verificationLinks: [
      {
        title: "Ethereum Lock-Up Contract",
        description: "Verify the 5 billion token lock-up on Ethereum",
        address: "0x1234567890123456789012345678901234567890",
        network: "Ethereum",
        explorer: "https://etherscan.io/address/0x1234567890123456789012345678901234567890",
      },
      {
        title: "Burn Address",
        description: "Verify all burned tokens at the burn address",
        address: "0x0000000000000000000000000000000000000000",
        network: "Ethereum",
        explorer: "https://etherscan.io/address/0x0000000000000000000000000000000000000000",
      },
      {
        title: "Multi-Sig Wallet",
        description: "Verify the multi-signature wallet managing lock-ups",
        address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
        network: "Ethereum",
        explorer: "https://etherscan.io/address/0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
      },
    ],
    burnHistory: {
      title: "Burn History",
      description: "Track all burn events and verify burn progress",
      events: [
        { date: "2024-01-01", amount: "1.04M", txHash: "0xabc123def456..." },
        { date: "2024-02-01", amount: "1.04M", txHash: "0xdef456abc789..." },
        { date: "2024-03-01", amount: "1.04M", txHash: "0x789abc123def..." },
      ],
    },
  },

  // Purchase Guide
  buyGuide: {
    title: "How to Buy $5WA",
    subtitle: "Step-by-Step Purchase Guide",
    introduction:
      "Follow these steps to purchase \"$5 Wrench Attack\" tokens. The process is simple and secure.",
    steps: [
      {
        number: 1,
        title: "Set Up a Wallet",
        description:
          "Download and install a Web3 wallet such as MetaMask, Trust Wallet, or WalletConnect. Create a new wallet or import an existing one.",
        details: [
          "Download MetaMask from https://metamask.io",
          "Create a new wallet and securely save your seed phrase",
          "Add funds (ETH or USDT) to your wallet",
        ],
      },
      {
        number: 2,
        title: "Connect to DEX",
        description:
          "Visit a decentralized exchange (DEX) like Uniswap, SushiSwap, or 1inch. Connect your wallet to the platform.",
        details: [
          "Go to https://uniswap.org (or your preferred DEX)",
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
          "Contract Address: 0x5WA5WA5WA5WA5WA5WA5WA5WA5WA5WA5WA5WA5WA",
          "Verify token name and symbol match official sources",
          "Check liquidity and trading volume",
        ],
      },
      {
        number: 4,
        title: "Enter Purchase Amount",
        description:
          "Specify how much ETH or USDT you want to exchange for 5WA tokens. Review the exchange rate and slippage.",
        details: [
          "Enter the amount of ETH/USDT you want to spend",
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

  // Footer
  footer: {
    copyright: "© 2024 $5 Wrench Attack. All rights reserved.",
    disclaimer:
      "This website is for informational purposes only. It is not financial advice. Always conduct your own research before investing.",
    links: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact",
    },
  },
};
