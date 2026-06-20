export const userPersona = {
  id: "usr_9f3a2b1c",
  username: "ian_dev",
  displayName: "Ian Yves",
  firstName: "Ian",
  lastName: "Yves",
  email: "ian@example.com",
  phoneNumber: "+250700000000",
  dateOfBirth: "2008-05-06",
  age: 18,
  gender: "male",
  pronouns: "he/him",
  bio: "Building next-gen apps 🚀",
  tagline: "Fullstack Engineer",
  website: "https://ian.dev",
  location: {
    country: "Rwanda",
    city: "Kigali",
    district: "Gasabo",
    timezone: "Africa/Kigali",
    coordinates: {
      lat: -1.9441,
      lng: 30.0619
    }
  },

  profile: {
    avatarUrl: "/media/avatar.jpg",
    coverUrl: "/media/cover.jpg",
    verified: false,
    badges: ["early-user", "developer"],
    theme: "dark",
    accentColor: "#ff0044",
    language: "en",
    secondaryLanguage: "fr"
  },

  social: {
    followersCount: 1200,
    followingCount: 340,
    postsCount: 87,
    likesReceived: 12000,
    shares: 340,
    comments: 780,
    engagementRate: 0.12,
    topFollowers: ["usr_1", "usr_2"],
    blockedUsers: [],
    mutedUsers: []
  },

  content: {
    posts: [
      {
        id: "post_1",
        type: "video",
        caption: "First launch 🚀",
        mediaUrl: "/videos/launch.mp4",
        thumbnail: "/thumbs/launch.jpg",
        likes: 120,
        comments: 30,
        shares: 10,
        createdAt: "2026-06-20T10:00:00Z",
        visibility: "public"
      }
    ],
    drafts: [],
    savedPosts: [],
    likedPosts: ["post_1", "post_2"],
    watchHistory: ["vid_1", "vid_2"]
  },

  mediaLibrary: {
    images: [
      { id: "img_1", url: "/img/1.jpg", size: 204800, format: "jpg" }
    ],
    videos: [
      { id: "vid_1", url: "/vid/1.mp4", duration: 30, quality: "1080p" }
    ],
    reels: [],
    stories: [],
    highlights: []
  },

  preferences: {
    autoplayVideos: true,
    darkMode: true,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    contentLanguage: "en",
    sensitiveContentFilter: true,
    adPersonalization: true,
    feedAlgorithm: "personalized",
    privacyLevel: "public"
  },

  security: {
    passwordLastChanged: "2026-06-01",
    twoFactorEnabled: true,
    twoFactorMethod: "authenticator",
    loginHistory: [
      { ip: "102.22.1.1", device: "Chrome", time: "2026-06-20T09:00:00Z" }
    ],
    sessions: [
      { device: "Laptop", active: true, lastSeen: "2026-06-20" }
    ],
    recoveryEmail: "backup@example.com",
    securityQuestionsSet: true,
    accountStatus: "active"
  },

  monetization: {
    walletBalance: 120.5,
    currency: "USD",
    totalEarnings: 540.75,
    adRevenue: 300,
    subscriptionsRevenue: 120,
    tipsReceived: 50,
    payouts: [
      { id: "pay_1", amount: 100, date: "2026-06-01", status: "completed" }
    ],
    bankAccountLinked: true,
    cryptoWallet: "0x123abc..."
  },

  analytics: {
    profileViews: 5400,
    impressions: 20000,
    reach: 15000,
    clickThroughRate: 0.08,
    avgWatchTime: 12.5,
    audience: {
      topCountries: ["Rwanda", "Kenya"],
      ageGroups: {
        "18-24": 60,
        "25-34": 30
      },
      genderSplit: {
        male: 70,
        female: 30
      }
    }
  },

  connections: {
    friends: ["usr_10", "usr_20"],
    requestsSent: [],
    requestsReceived: [],
    groups: ["grp_1"],
    pagesFollowed: ["page_1"]
  },

  developer: {
    apiKeys: ["key_123", "key_456"],
    rateLimit: 1000,
    webhooks: [
      {
        url: "https://api.ian.dev/webhook",
        event: "user.updated"
      }
    ],
    sandboxMode: false
  },

  system: {
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-06-20T12:00:00Z",
    lastActiveAt: "2026-06-20T12:30:00Z",
    version: "1.0.0",
    flags: {
      isBanned: false,
      isShadowBanned: false,
      isFeatured: true
    }
  }
};