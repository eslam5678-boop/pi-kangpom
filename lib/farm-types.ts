// ==========================================
// 1. واجهات أنواع البيانات (TypeScript Interfaces)
// ==========================================

export interface OwnedAsset {
  uid: string
  defId: string
  hunger: number
  lastFedAt: number
  sickSince: number
  dead: boolean
  landId: string
  storedProduct: number
  health: number
}

// الواجهة الخاصة بالعناصر الموضوعة في الشبكة
export interface PlacedItem {
  id: string
  defId: string
  x?: number
  y?: number
  tileX?: number
  tileY?: number
  type?: string
  name?: string
  emoji?: string
  health?: number
  hunger?: number
  dead?: boolean
  sickSince?: number
  lastFedAt?: number
  landId?: string
  [key: string]: any
}

export interface FactoryJob {
  factoryId: string
  startedAt: number
  finishesAt: number
}

export interface MarketListing {
  id: string
  defId: string
  assetName: string
  emoji: string
  seller: string
  price: number
  mine: boolean
}

export interface LandLease {
  id: string
  leased: boolean
  expiresAt: number
}

export interface GameState {
  coins: number
  xp: number
  completedTasks: string[]
  assets: OwnedAsset[]
  leases: LandLease[]
  craftedGoods: Record<string, number>
  factoryJobs: FactoryJob[]
  listings: MarketListing[]
  adsWatchedToday: number
  lastAdDate: string
  lastTaskResetDate: string
  workerStamina: number
  lastStaminaUpdateAt: number
  hasSeenOnboarding: boolean
  preferredLanguage: string
  lastHealthCheckAt: number
}

// جعل كل خصائص FarmState اختيارية لمنع أي خطأ ناقص في الـ Hook
export interface FarmState {
  coins?: number
  xp?: number
  completedTasks?: string[]
  assets?: OwnedAsset[]
  leases?: LandLease[]
  craftedGoods?: Record<string, number>
  factoryJobs?: FactoryJob[]
  listings?: MarketListing[]
  adsWatchedToday?: number
  lastAdDate?: string
  lastTaskResetDate?: string
  workerStamina?: number
  lastStaminaUpdateAt?: number
  hasSeenOnboarding?: boolean
  preferredLanguage?: string
  lastHealthCheckAt?: number
  gridColumns?: number
  gridRows?: number
  placedItems: PlacedItem[] // تم التعديل لتكون إجبارية كما يجب
  selectedItemForAction?: any
  isRelocating?: boolean
  isDiwanModalOpen?: boolean
  [key: string]: any
}

export interface AssetDef {
  id: string
  name: string
  emoji: string
  produces: string | null
  price: number
}

export interface LandTierDef {
  id: string
  name: string
  cap: number
  periodMs: number
  rentCoins: number
}

export interface FactoryDef {
  id: string
  name: string
  input: string
  inputAmount: number
  output: string
  outputValue: number
  durationMs: number
}

export interface DailyTask {
  id: string
  titleKey: string
  descKey: string
  xpReward: number
  coinReward: number
}

// ==========================================
// 2. الثوابت وإعدادات اللعبة (Constants)
// ==========================================

export const WORKER_STAMINA_DRAIN_PER_FACTORY_JOB = 20
export const WORKER_MIN_STAMINA_FOR_PRODUCTION = 10

export const ASSETS: AssetDef[] = [
  { id: "chicken", name: "دجاج بلدي", emoji: "🐔", produces: "eggs", price: 50 },
  { id: "tilapia", name: "سمك بلطي", emoji: "🐟", produces: "fish", price: 80 },
  { id: "cow", name: "بقرة ملكية", emoji: "🐄", produces: "milk", price: 320 },
  { id: "sheep", name: "أغنام", emoji: "🐑", produces: "wool", price: 180 },
  { id: "duck", name: "بط صحراوي", emoji: "🦆", produces: "feathers", price: 75 },
  { id: "oyster", name: "محار ملكي", emoji: "🦪", produces: "pearls", price: 480 },
]

export const LAND_TIERS: LandTierDef[] = [
  { id: "municipal", name: "الحيز البلدي", cap: 5, periodMs: 0, rentCoins: 0 },
  { id: "farmer", name: "عزبة المزارع", cap: 12, periodMs: 7 * 24 * 3600 * 1000, rentCoins: 200 },
  { id: "pasha", name: "المزرعة البشواتية", cap: 25, periodMs: 14 * 24 * 3600 * 1000, rentCoins: 800 },
  { id: "royal", name: "المحمية الملكية", cap: 50, periodMs: 30 * 24 * 3600 * 1000, rentCoins: 2500 },
]

export const FACTORIES: FactoryDef[] = [
  { id: "dairy", name: "معمل الألبان", input: "milk", inputAmount: 2, output: "cheese", outputValue: 120, durationMs: 10000 },
  { id: "bakery", name: "المخبز الملكي", input: "eggs", inputAmount: 3, output: "cake", outputValue: 80, durationMs: 8000 },
]

// المهام اليومية المطلوبة
export const DAILY_TASKS: DailyTask[] = [
  {
    id: "feed_chickens",
    titleKey: "task_feed_chickens_title",
    descKey: "task_feed_chickens_desc",
    xpReward: 25,
    coinReward: 50,
  },
  {
    id: "harvest_crops",
    titleKey: "task_harvest_crops_title",
    descKey: "task_harvest_crops_desc",
    xpReward: 30,
    coinReward: 60,
  },
  {
    id: "cook_meal",
    titleKey: "task_cook_meal_title",
    descKey: "task_cook_meal_desc",
    xpReward: 40,
    coinReward: 100,
  },
]

// ==========================================
// 3. الدوال المساعدة (Helper Functions)
// ==========================================

export function uid(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
}

export function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export function isNewDay(lastDateStr: string): boolean {
  if (!lastDateStr) return true
  return today() !== lastDateStr
}

export function randomNpc(): string {
  const npcs = ["فرعون العصور", "معلم إبراهيم", "شيخ العرب", "الأمير إخناتون", "الحاج متولي"]
  return npcs[Math.floor(Math.random() * npcs.length)]
}

export function assetDef(defId: string): AssetDef {
  return ASSETS.find((a) => a.id === defId) || { id: defId, name: defId, emoji: "📦", produces: null, price: 100 }
}

export function landTier(tierId: string): LandTierDef {
  return LAND_TIERS.find((t) => t.id === tierId) || LAND_TIERS[0]
}

export function computeStatus(asset: OwnedAsset, now: number) {
  const hoursSinceFed = (now - asset.lastFedAt) / (3600 * 1000)
  const hunger = Math.max(0, Math.floor(100 - hoursSinceFed * 10))
  const sick = asset.sickSince > 0 || hunger < 20
  const dead = asset.dead || (asset.sickSince > 0 && (now - asset.sickSince) > 24 * 3600 * 1000)
  return { hunger, sick, dead }
}

export function computeWorkerStamina(currentStamina: number, lastUpdateAt: number, now: number): number {
  const minutes = (now - lastUpdateAt) / (60 * 1000)
  const restored = minutes * 2
  return Math.min(100, Math.floor(currentStamina + restored))
}

export function computeAssetHealth(asset: OwnedAsset, now: number): number {
  if (asset.dead) return 0
  const hours = (now - asset.lastFedAt) / (3600 * 1000)
  if (hours > 12) {
    return Math.max(10, asset.health - Math.floor((hours - 12) * 5))
  }
  return Math.min(100, asset.health + 2)
}

export function isHealthCritical(health: number): boolean {
  return health < 30
}

export function resetDailyTasks(state: GameState): GameState {
  return {
    ...state,
    completedTasks: [],
    lastTaskResetDate: today(),
  }
}

export function resetDailyAds(state: GameState): GameState {
  return {
    ...state,
    adsWatchedToday: 0,
    lastAdDate: today(),
  }
}
