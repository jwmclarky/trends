import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { 
  ShieldAlert, 
  Search, 
  Scale, 
  CreditCard, 
  Fingerprint, 
  HelpCircle,
  FileCheck,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Info
} from "lucide-react";

type CountryCompliance = {
  name: string;
  code: string;
  ageVerification: "Mandatory (Enforced)" | "Pending Bill" | "Not Enforced" | "Strict State Laws";
  ageRisk: "high" | "medium" | "low";
  paymentProcessor: "Standard High-Risk Allowed" | "Strict Credit Card Audit" | "High Restriction" | "Crypto Preferred";
  paymentRisk: "high" | "medium" | "low";
  contentCensorship: "None" | "Mosaic Mandatory" | "High Self-Regulation" | "Strict Platform Moderation";
  overallRisk: "Safe" | "Moderate Risk" | "High Risk" | "Critical Risk";
  overallColor: "green" | "yellow" | "orange" | "red";
  guidelines: string[];
  platformStatus: {
    onlyfans: "Supported" | "Restricted" | "Banned";
    fansly: "Supported" | "Restricted" | "Banned";
    clips4sale: "Supported" | "Restricted" | "Banned";
  };
};

const COMPLIANCE_DATA: CountryCompliance[] = [
  {
    name: "United States",
    code: "US",
    ageVerification: "Strict State Laws",
    ageRisk: "high",
    paymentProcessor: "Strict Credit Card Audit",
    paymentRisk: "medium",
    contentCensorship: "Strict Platform Moderation",
    overallRisk: "Moderate Risk",
    overallColor: "yellow",
    guidelines: [
      "State-level age verification laws (Texas, Utah, Florida, etc.) require ID uploads on primary sites.",
      "Mastercard adult content rules (April 2021) mandate pre-approval and clear record-keeping of age verification.",
      "Sesta-Fosta laws hold hosting companies liable for user-generated content.",
    ],
    platformStatus: { onlyfans: "Supported", fansly: "Supported", clips4sale: "Supported" }
  },
  {
    name: "United Kingdom",
    code: "GB",
    ageVerification: "Mandatory (Enforced)",
    ageRisk: "high",
    paymentProcessor: "Standard High-Risk Allowed",
    paymentRisk: "low",
    contentCensorship: "High Self-Regulation",
    overallRisk: "Moderate Risk",
    overallColor: "yellow",
    guidelines: [
      "Online Safety Act forces platforms to implement strict age verification to prevent minors from access.",
      "Failure of platform verification leads to heavy regulatory fines from Ofcom.",
      "Local payment processing requires high-risk merchant accounts or merchant of record structures."
    ],
    platformStatus: { onlyfans: "Supported", fansly: "Supported", clips4sale: "Supported" }
  },
  {
    name: "Germany",
    code: "DE",
    ageVerification: "Mandatory (Enforced)",
    ageRisk: "high",
    paymentProcessor: "High Restriction",
    paymentRisk: "high",
    contentCensorship: "Strict Platform Moderation",
    overallRisk: "High Risk",
    overallColor: "orange",
    guidelines: [
      "Strict youth protection laws require real-time closed user group models with ID checks.",
      "Banned kinks include non-consensual themes or heavy bdsm/scat on generic hosting platforms.",
      "German banks strictly monitor transactions to adult portals."
    ],
    platformStatus: { onlyfans: "Restricted", fansly: "Restricted", clips4sale: "Supported" }
  },
  {
    name: "Japan",
    code: "JP",
    ageVerification: "Not Enforced",
    ageRisk: "low",
    paymentProcessor: "High Restriction",
    paymentRisk: "high",
    contentCensorship: "Mosaic Mandatory",
    overallRisk: "High Risk",
    overallColor: "orange",
    guidelines: [
      "Penal Code Article 175 requires censorship (mosaics) of explicit genitallia in all distributed media.",
      "Failure to censor results in criminal prosecution for local creators.",
      "International credit cards are increasingly blocking purchases on Japanese adult hubs."
    ],
    platformStatus: { onlyfans: "Restricted", fansly: "Restricted", clips4sale: "Restricted" }
  },
  {
    name: "Canada",
    code: "CA",
    ageVerification: "Pending Bill",
    ageRisk: "medium",
    paymentProcessor: "Standard High-Risk Allowed",
    paymentRisk: "low",
    contentCensorship: "None",
    overallRisk: "Safe",
    overallColor: "green",
    guidelines: [
      "Bill S-210 proposes mandatory age verification on all adult-themed sites, currently in review.",
      "No domestic content censorship laws; follows standard international copyright guidelines.",
      "Highly friendly to self-hosted subscription sites using merchant systems."
    ],
    platformStatus: { onlyfans: "Supported", fansly: "Supported", clips4sale: "Supported" }
  },
  {
    name: "Australia",
    code: "AU",
    ageVerification: "Mandatory (Enforced)",
    ageRisk: "high",
    paymentProcessor: "Standard High-Risk Allowed",
    paymentRisk: "medium",
    contentCensorship: "High Self-Regulation",
    overallRisk: "Moderate Risk",
    overallColor: "yellow",
    guidelines: [
      "eSafety Commissioner holds sweeping authority to order take-down of non-compliant content.",
      "Strict age-verification pilot plans are being rolled out globally for local visitors.",
      "Tax regulations require GST reporting for foreign digital service providers."
    ],
    platformStatus: { onlyfans: "Supported", fansly: "Supported", clips4sale: "Supported" }
  },
  {
    name: "France",
    code: "FR",
    ageVerification: "Mandatory (Enforced)",
    ageRisk: "high",
    paymentProcessor: "High Restriction",
    paymentRisk: "medium",
    contentCensorship: "Strict Platform Moderation",
    overallRisk: "High Risk",
    overallColor: "orange",
    guidelines: [
      "Arcom regulatory body actively blocks sites that do not enforce double-blind age verification.",
      "French digital identity solutions are required for adult platform signup.",
      "Strict content guidelines block extreme themes on public streaming hubs."
    ],
    platformStatus: { onlyfans: "Supported", fansly: "Restricted", clips4sale: "Restricted" }
  },
  {
    name: "Brazil",
    code: "BR",
    ageVerification: "Not Enforced",
    ageRisk: "low",
    paymentProcessor: "High Restriction",
    paymentRisk: "high",
    contentCensorship: "None",
    overallRisk: "Moderate Risk",
    overallColor: "yellow",
    guidelines: [
      "Local credit card processing is difficult for digital adult services; Pix is preferred.",
      "Platform operators must comply with local consumer protection laws regarding subscriptions.",
      "Strict laws protect against unauthorized sharing of intimate media."
    ],
    platformStatus: { onlyfans: "Supported", fansly: "Supported", clips4sale: "Supported" }
  }
];

export default function Legality() {
  const { isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery) return COMPLIANCE_DATA;
    return COMPLIANCE_DATA.filter(country => 
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const getRiskColorClass = (risk: CountryCompliance["overallColor"]) => {
    switch (risk) {
      case "green": return "border-emerald-500/20 bg-emerald-950/10 text-emerald-400";
      case "yellow": return "border-amber-500/20 bg-amber-950/10 text-amber-400";
      case "orange": return "border-orange-500/20 bg-orange-950/10 text-orange-400";
      case "red": return "border-red-500/20 bg-red-950/10 text-red-400";
    }
  };

  const getSubRiskBadge = (risk: "high" | "medium" | "low") => {
    switch (risk) {
      case "high": return "bg-red-950/30 text-red-400 border border-red-500/20";
      case "medium": return "bg-amber-950/30 text-amber-400 border border-amber-500/20";
      case "low": return "bg-emerald-950/30 text-emerald-400 border border-emerald-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        {/* Glow circles */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-zinc-800/80 pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-violet-400 text-sm font-semibold tracking-wider uppercase mb-1">
              <Scale className="w-4 h-4" />
              <span>Feature 6</span>
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Legality & Compliance Radar
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Stay ahead of payment processor shifts and age-verification laws across major content markets.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search by country name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-zinc-900 border-zinc-800 text-white rounded-lg focus:border-violet-500"
            />
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-8 p-4 rounded-xl border border-violet-500/10 bg-violet-950/10 flex gap-3 relative z-10">
          <Info className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300 leading-relaxed">
            <span className="font-bold text-violet-300">Disclaimer:</span> Compliance guidelines listed here represent global search policy shifts, payment credit standards, and legal bills. This information does not constitute formal legal counsel. Always consult qualified legal services in your domestic jurisdiction.
          </div>
        </div>

        {/* Radar Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {filteredData.map(country => (
            <Card key={country.code} className="border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md shadow-lg rounded-xl overflow-hidden hover:border-violet-500/20 transition-all duration-300">
              <CardHeader className="pb-4 border-b border-zinc-900 flex flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-violet-400" />
                    <CardTitle className="text-lg font-bold text-white">{country.name}</CardTitle>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                      {country.code}
                    </span>
                  </div>
                </div>

                {/* Risk Level Badge */}
                <div className={`px-3 py-1 rounded-full border text-xs font-bold ${getRiskColorClass(country.overallColor)}`}>
                  {country.overallRisk}
                </div>
              </CardHeader>
              <CardContent className="pt-5 space-y-5">
                
                {/* Specific metrics */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800 space-y-1">
                    <span className="text-[9px] text-zinc-500 uppercase font-semibold block">Age Verification</span>
                    <span className="font-bold text-[10px] truncate text-white block">{country.ageVerification}</span>
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] uppercase font-bold mt-1 ${getSubRiskBadge(country.ageRisk)}`}>
                      {country.ageRisk} risk
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800 space-y-1">
                    <span className="text-[9px] text-zinc-500 uppercase font-semibold block">Processor Policy</span>
                    <span className="font-bold text-[10px] truncate text-white block">{country.paymentProcessor}</span>
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] uppercase font-bold mt-1 ${getSubRiskBadge(country.paymentRisk)}`}>
                      {country.paymentRisk} risk
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800 space-y-1">
                    <span className="text-[9px] text-zinc-500 uppercase font-semibold block">Content Censorship</span>
                    <span className="font-bold text-[10px] truncate text-white block">{country.contentCensorship}</span>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[8px] bg-zinc-800 text-zinc-400 mt-1 uppercase font-bold border border-zinc-700">
                      Standard
                    </span>
                  </div>
                </div>

                {/* Platform Status */}
                <div className="p-3.5 rounded-lg border border-zinc-900 bg-zinc-900/20 space-y-2">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Platform Support Status</div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="space-y-0.5">
                      <div className="text-[9px] text-zinc-500 font-semibold">OnlyFans</div>
                      <span className={`text-[10px] font-bold ${country.platformStatus.onlyfans === "Supported" ? "text-emerald-400" : "text-amber-400"}`}>
                        {country.platformStatus.onlyfans}
                      </span>
                    </div>
                    <div className="space-y-0.5 border-x border-zinc-800">
                      <div className="text-[9px] text-zinc-500 font-semibold">Fansly</div>
                      <span className={`text-[10px] font-bold ${country.platformStatus.fansly === "Supported" ? "text-emerald-400" : "text-amber-400"}`}>
                        {country.platformStatus.fansly}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[9px] text-zinc-500 font-semibold">Clips4Sale</div>
                      <span className={`text-[10px] font-bold ${country.platformStatus.clips4sale === "Supported" ? "text-emerald-400" : "text-amber-400"}`}>
                        {country.platformStatus.clips4sale}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bullet point guidelines */}
                <div className="space-y-2">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-violet-400" />
                    Compliance Guidelines & Audits
                  </div>
                  <ul className="space-y-2 pt-1">
                    {country.guidelines.map((guide, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-zinc-300 leading-relaxed">
                        <span className="text-violet-400 select-none shrink-0">•</span>
                        <span>{guide}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

      </main>
    </div>
  );
}
