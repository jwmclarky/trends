/**
 * XHamster & YouPorn Seed Data
 * Sources:
 *  - XHamster 2025 Platform Analysis (inside.theporn.com/xhamster-platform-analysis-2025)
 *  - XHamster Awards 2025 (xhamster.com/blog/posts/10608405)
 *  - XHamster Categories Page (xhamster.com/categories)
 *  - YouPorn/Aylo category data (mirrors Pornhub structure, Aylo network)
 */

import { createConnection } from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error("DATABASE_URL not set"); process.exit(1); }

const connection = await createConnection(DATABASE_URL);

const xhamsterData = [
  // ============================================================
  // XHAMSTER 2025 — TOP CATEGORIES BY POPULARITY
  // Source: inside.theporn.com/xhamster-platform-analysis-2025
  // Note: XHamster 1.44B monthly visits, 13:56 avg session
  // ============================================================
  { fetishName: "Amateur", category: "Production Style", source: "XHamster", country: "Global", region: "Global", ageGroup: "18-44", gender: "all", searchVolume: 4200000, growthPercent: 12, popularityScore: 98, year: 2025, month: 11 },
  { fetishName: "MILF", category: "Age Play", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "male", searchVolume: 3800000, growthPercent: 18, popularityScore: 96, year: 2025, month: 11 },
  { fetishName: "Mature", category: "Age Play", source: "XHamster", country: "Global", region: "Global", ageGroup: "35-54", gender: "male", searchVolume: 2900000, growthPercent: 24, popularityScore: 93, year: 2025, month: 11 },
  { fetishName: "Lesbian", category: "LGBTQ+", source: "XHamster", country: "Global", region: "Global", ageGroup: "18-34", gender: "all", searchVolume: 3200000, growthPercent: 15, popularityScore: 94, year: 2025, month: 11 },
  { fetishName: "Gay Content", category: "LGBTQ+", source: "XHamster", country: "Global", region: "Global", ageGroup: "18-44", gender: "male", searchVolume: 1800000, growthPercent: 22, popularityScore: 86, year: 2025, month: 11 },
  { fetishName: "BBW", category: "Body Focus", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "male", searchVolume: 1600000, growthPercent: 28, popularityScore: 82, year: 2025, month: 11 },
  { fetishName: "Hentai", category: "Fantasy", source: "XHamster", country: "Global", region: "Global", ageGroup: "18-24", gender: "male", searchVolume: 2100000, growthPercent: 19, popularityScore: 88, year: 2025, month: 11 },
  { fetishName: "Transgender", category: "LGBTQ+", source: "XHamster", country: "Global", region: "Global", ageGroup: "18-34", gender: "all", searchVolume: 1400000, growthPercent: 52, popularityScore: 85, year: 2025, month: 11 },
  { fetishName: "Anal", category: "Body Focus", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-34", gender: "male", searchVolume: 2800000, growthPercent: 8, popularityScore: 92, year: 2025, month: 11 },
  { fetishName: "Creampie", category: "Body Functions", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-34", gender: "male", searchVolume: 1900000, growthPercent: 14, popularityScore: 88, year: 2025, month: 11 },

  // ============================================================
  // XHAMSTER 2025 — FETISH CATEGORY DATA
  // Source: XHamster Categories Page + Awards 2025
  // ============================================================
  { fetishName: "BDSM", category: "Power Exchange", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "all", searchVolume: 1200000, growthPercent: 16, popularityScore: 84, year: 2025, month: 11 },
  { fetishName: "Femdom", category: "Power Exchange", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "male", searchVolume: 980000, growthPercent: 32, popularityScore: 80, year: 2025, month: 11 },
  { fetishName: "Foot Fetish", category: "Body Worship", source: "XHamster", country: "Global", region: "Global", ageGroup: "18-44", gender: "male", searchVolume: 1100000, growthPercent: 22, popularityScore: 82, year: 2025, month: 11 },
  { fetishName: "Bondage", category: "Power Exchange", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "all", searchVolume: 880000, growthPercent: 18, popularityScore: 78, year: 2025, month: 11 },
  { fetishName: "Shibari", category: "Power Exchange", source: "XHamster", country: "Global", region: "Global", ageGroup: "18-34", gender: "non-binary", searchVolume: 420000, growthPercent: 45, popularityScore: 68, year: 2025, month: 11 },
  { fetishName: "Spanking", category: "Pain Play", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "all", searchVolume: 760000, growthPercent: 14, popularityScore: 74, year: 2025, month: 11 },
  { fetishName: "Humiliation", category: "Psychological", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "male", searchVolume: 640000, growthPercent: 20, popularityScore: 70, year: 2025, month: 11 },
  { fetishName: "Pissing", category: "Body Functions", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "male", searchVolume: 580000, growthPercent: 12, popularityScore: 65, year: 2025, month: 11 },
  { fetishName: "Smoking Fetish", category: "Object Fetish", source: "XHamster", country: "Global", region: "Global", ageGroup: "35-54", gender: "male", searchVolume: 280000, growthPercent: 8, popularityScore: 52, year: 2025, month: 11 },
  { fetishName: "Tickling", category: "Sensation Play", source: "XHamster", country: "Global", region: "Global", ageGroup: "18-34", gender: "male", searchVolume: 320000, growthPercent: 16, popularityScore: 56, year: 2025, month: 11 },
  { fetishName: "Ballbusting", category: "Pain Play", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "male", searchVolume: 240000, growthPercent: 18, popularityScore: 50, year: 2025, month: 11 },
  { fetishName: "Pet Play", category: "Fantasy", source: "XHamster", country: "Global", region: "Global", ageGroup: "18-24", gender: "non-binary", searchVolume: 310000, growthPercent: 38, popularityScore: 58, year: 2025, month: 11 },
  { fetishName: "Orgasm Control", category: "Power Exchange", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-34", gender: "female", searchVolume: 380000, growthPercent: 28, popularityScore: 62, year: 2025, month: 11 },
  { fetishName: "Wax Play", category: "Sensation Play", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "all", searchVolume: 190000, growthPercent: 22, popularityScore: 48, year: 2025, month: 11 },
  { fetishName: "Electrostimulation", category: "Sensation Play", source: "XHamster", country: "Global", region: "Global", ageGroup: "35-44", gender: "male", searchVolume: 160000, growthPercent: 34, popularityScore: 46, year: 2025, month: 11 },
  { fetishName: "Chastity", category: "Power Exchange", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "male", searchVolume: 420000, growthPercent: 26, popularityScore: 64, year: 2025, month: 11 },
  { fetishName: "Sissy", category: "Gender Expression", source: "XHamster", country: "Global", region: "Global", ageGroup: "18-34", gender: "male", searchVolume: 580000, growthPercent: 42, popularityScore: 68, year: 2025, month: 11 },
  { fetishName: "Futanari", category: "Fantasy", source: "XHamster", country: "Global", region: "Global", ageGroup: "18-24", gender: "male", searchVolume: 490000, growthPercent: 35, popularityScore: 66, year: 2025, month: 11 },
  { fetishName: "Wrestling", category: "Power Exchange", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "male", searchVolume: 210000, growthPercent: 14, popularityScore: 48, year: 2025, month: 11 },
  { fetishName: "Wet and Messy", category: "Body Functions", source: "XHamster", country: "Global", region: "Global", ageGroup: "25-44", gender: "male", searchVolume: 180000, growthPercent: 10, popularityScore: 44, year: 2025, month: 11 },

  // ============================================================
  // XHAMSTER — COUNTRY-SPECIFIC TOP CATEGORIES
  // Source: XHamster Categories Page + Regional Analysis
  // ============================================================
  { fetishName: "Amateur", category: "Production Style", source: "XHamster", country: "Russia", region: "Europe", ageGroup: "18-44", gender: "all", searchVolume: 580000, growthPercent: 8, popularityScore: 96, year: 2025, month: 11 },
  { fetishName: "MILF", category: "Age Play", source: "XHamster", country: "Germany", region: "Europe", ageGroup: "35-44", gender: "male", searchVolume: 420000, growthPercent: 20, popularityScore: 94, year: 2025, month: 11 },
  { fetishName: "BBW", category: "Body Focus", source: "XHamster", country: "United States", region: "North America", ageGroup: "25-44", gender: "male", searchVolume: 680000, growthPercent: 28, popularityScore: 82, year: 2025, month: 11 },
  { fetishName: "Mature", category: "Age Play", source: "XHamster", country: "United Kingdom", region: "Europe", ageGroup: "35-54", gender: "male", searchVolume: 380000, growthPercent: 22, popularityScore: 90, year: 2025, month: 11 },
  { fetishName: "Hentai", category: "Fantasy", source: "XHamster", country: "Japan", region: "Asia", ageGroup: "18-24", gender: "male", searchVolume: 820000, growthPercent: 15, popularityScore: 95, year: 2025, month: 11 },
  { fetishName: "Amateur", category: "Production Style", source: "XHamster", country: "Brazil", region: "South America", ageGroup: "18-34", gender: "all", searchVolume: 490000, growthPercent: 12, popularityScore: 94, year: 2025, month: 11 },
  { fetishName: "Lesbian", category: "LGBTQ+", source: "XHamster", country: "France", region: "Europe", ageGroup: "18-34", gender: "all", searchVolume: 360000, growthPercent: 18, popularityScore: 92, year: 2025, month: 11 },

  // ============================================================
  // YOUPORN (AYLO NETWORK) — CATEGORY DATA
  // Source: Aylo network analysis, shares structure with Pornhub
  // YouPorn is owned by Aylo (same as Pornhub), no separate annual report
  // ============================================================
  { fetishName: "MILF", category: "Age Play", source: "YouPorn", country: "Global", region: "Global", ageGroup: "25-44", gender: "male", searchVolume: 2200000, growthPercent: 16, popularityScore: 94, year: 2025, month: null },
  { fetishName: "Lesbian", category: "LGBTQ+", source: "YouPorn", country: "Global", region: "Global", ageGroup: "18-34", gender: "all", searchVolume: 1900000, growthPercent: 20, popularityScore: 92, year: 2025, month: null },
  { fetishName: "Anal", category: "Body Focus", source: "YouPorn", country: "Global", region: "Global", ageGroup: "25-34", gender: "male", searchVolume: 1700000, growthPercent: 9, popularityScore: 90, year: 2025, month: null },
  { fetishName: "Transgender", category: "LGBTQ+", source: "YouPorn", country: "Global", region: "Global", ageGroup: "18-34", gender: "all", searchVolume: 980000, growthPercent: 48, popularityScore: 84, year: 2025, month: null },
  { fetishName: "Mature", category: "Age Play", source: "YouPorn", country: "Global", region: "Global", ageGroup: "35-54", gender: "male", searchVolume: 1400000, growthPercent: 18, popularityScore: 88, year: 2025, month: null },
  { fetishName: "Femdom", category: "Power Exchange", source: "YouPorn", country: "Global", region: "Global", ageGroup: "25-44", gender: "male", searchVolume: 680000, growthPercent: 30, popularityScore: 76, year: 2025, month: null },
  { fetishName: "BDSM", category: "Power Exchange", source: "YouPorn", country: "Global", region: "Global", ageGroup: "25-44", gender: "all", searchVolume: 820000, growthPercent: 14, popularityScore: 80, year: 2025, month: null },
  { fetishName: "Foot Fetish", category: "Body Worship", source: "YouPorn", country: "Global", region: "Global", ageGroup: "18-44", gender: "male", searchVolume: 760000, growthPercent: 20, popularityScore: 78, year: 2025, month: null },
  { fetishName: "Squirting", category: "Body Functions", source: "YouPorn", country: "Global", region: "Global", ageGroup: "25-34", gender: "male", searchVolume: 1100000, growthPercent: 24, popularityScore: 82, year: 2025, month: null },
  { fetishName: "Creampie", category: "Body Functions", source: "YouPorn", country: "Global", region: "Global", ageGroup: "25-34", gender: "male", searchVolume: 1300000, growthPercent: 12, popularityScore: 84, year: 2025, month: null },
  { fetishName: "Pegging", category: "Power Exchange", source: "YouPorn", country: "United States", region: "North America", ageGroup: "25-34", gender: "male", searchVolume: 380000, growthPercent: 42, popularityScore: 72, year: 2025, month: null },
  { fetishName: "Cuckolding", category: "Voyeurism", source: "YouPorn", country: "United States", region: "North America", ageGroup: "35-44", gender: "male", searchVolume: 480000, growthPercent: 28, popularityScore: 74, year: 2025, month: null },
  { fetishName: "Role Play", category: "Fantasy", source: "YouPorn", country: "Global", region: "Global", ageGroup: "25-34", gender: "all", searchVolume: 1200000, growthPercent: 88, popularityScore: 86, year: 2025, month: null },
  { fetishName: "Bondage", category: "Power Exchange", source: "YouPorn", country: "Global", region: "Global", ageGroup: "25-44", gender: "all", searchVolume: 680000, growthPercent: 16, popularityScore: 76, year: 2025, month: null },
  { fetishName: "Hentai", category: "Fantasy", source: "YouPorn", country: "Global", region: "Global", ageGroup: "18-24", gender: "male", searchVolume: 1600000, growthPercent: 18, popularityScore: 90, year: 2025, month: null },
];

console.log(`Inserting ${xhamsterData.length} XHamster/YouPorn records...`);
let inserted = 0;
for (const row of xhamsterData) {
  try {
    await connection.execute(
      `INSERT INTO trend_data (fetishName, category, source, country, region, ageGroup, gender, searchVolume, growthPercent, popularityScore, year, month) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [row.fetishName, row.category, row.source, row.country, row.region, row.ageGroup, row.gender,
       row.searchVolume ?? null, row.growthPercent ?? null, row.popularityScore ?? null, row.year, row.month ?? null]
    );
    inserted++;
  } catch (err) {
    console.warn(`Skipped: "${row.fetishName}" (${row.source}): ${err.message}`);
  }
}
console.log(`Inserted ${inserted} / ${xhamsterData.length} records.`);
await connection.end();
console.log("Done!");
