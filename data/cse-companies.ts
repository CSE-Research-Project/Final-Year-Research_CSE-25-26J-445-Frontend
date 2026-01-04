/**
 * CSE (Colombo Stock Exchange) Company Data
 * Contains all listed companies with their names and stock symbols
 */

export interface CseCompany {
    name: string
    symbol: string
}

export const CSE_COMPANIES: CseCompany[] = [
    // A
    { name: "Abans Electricals", symbol: "ABAN.N0000" },
    { name: "Abans Finance", symbol: "AFSL.N0000" },
    { name: "Access Engineering", symbol: "AEL.N0000" },
    { name: "ACL Cables", symbol: "ACL.N0000" },
    { name: "ACL Plastics", symbol: "APLA.N0000" },
    { name: "ACME Printing & Packaging", symbol: "ACME.N0000" },
    { name: "Agalawatte Plantations", symbol: "AGAL.N0000" },
    { name: "Agarapatana Plantations", symbol: "AGPL.N0000" },
    { name: "Agstar", symbol: "AGST.N0000" },
    { name: "Aitken Spence Hotel Holdings", symbol: "AHUN.N0000" },
    { name: "Aitken Spence Plantation Managements", symbol: "ASPM.N0000" },
    { name: "Aitken Spence", symbol: "SPEN.N0000" },
    { name: "Alliance Finance Company", symbol: "ALLI.N0000" },
    { name: "Alpha Fire Services", symbol: "AFS.N0000" },
    { name: "Alumex", symbol: "ALUM.N0000" },
    { name: "Amana Bank", symbol: "ABL.N0000" },
    { name: "Amana Takaful", symbol: "ATL.N0000" },
    { name: "Amana Takaful Life", symbol: "ATLL.N0000" },
    { name: "Ambeon Capital", symbol: "TAP.N0000" },
    { name: "Ambeon Holdings", symbol: "GREG.N0000" },
    { name: "AMW Capital Leasing & Finance", symbol: "AMCL.N0000" },
    { name: "Arpico Insurance", symbol: "AINS.N0000" },
    { name: "Asia Asset Finance", symbol: "AAF.N0000" },
    { name: "Asia Capital", symbol: "ACAP.N0000" },
    { name: "Asia Siyaka Commodities", symbol: "ASIY.N0000" },
    { name: "Asian Hotels & Properties", symbol: "AHPL.N0000" },
    { name: "Asiri Hospital Holdings", symbol: "ASIR.N0000" },
    { name: "Asiri Surgical Hospital", symbol: "AMSL.N0000" },
    { name: "Associated Motor Finance Company", symbol: "AMF.N0000" },

    // B
    { name: "B P P L Holdings", symbol: "BPPL.N0000" },
    { name: "Bairaha Farms", symbol: "BFL.N0000" },
    { name: "Balangoda Plantations", symbol: "BALA.N0000" },
    { name: "Bansei Royal Resorts Hikkaduwa", symbol: "BRR.N0000" },
    { name: "Beruwala Resorts", symbol: "BERU.N0000" },
    { name: "Blue Diamonds Jewellery Worldwide", symbol: "BLUE.N0000" },
    { name: "Bogala Graphite Lanka", symbol: "BOGA.N0000" },
    { name: "Bogawantalawa Tea Estates", symbol: "BOPL.N0000" },
    { name: "Brown and Company", symbol: "BRWN.N0000" },
    { name: "Browns Beach Hotels", symbol: "BBH.N0000" },
    { name: "Browns Investments", symbol: "BIL.N0000" },
    { name: "Bukit Darah", symbol: "BUKI.N0000" },

    // C
    { name: "C M Holdings", symbol: "COLO.N0000" },
    { name: "C T Holdings", symbol: "CTHR.N0000" },
    { name: "C T Land Development", symbol: "CTLD.N0000" },
    { name: "C. W. Mackie", symbol: "CWM.N0000" },
    { name: "Capital Alliance", symbol: "CALT.N0000" },
    { name: "Cargills (Ceylon)", symbol: "CARG.N0000" },
    { name: "Cargills Bank", symbol: "CBNK.N0000" },
    { name: "Cargo Boat Development Company", symbol: "CABO.N0000" },
    { name: "Carson Cumberbatch", symbol: "CARS.N0000" },
    { name: "Central Finance Company", symbol: "CFIN.N0000" },
    { name: "Central Industries", symbol: "CIND.N0000" },
    { name: "Ceylinco Insurance", symbol: "CINS.N0000" },
    { name: "Ceylon Beverage Holdings", symbol: "BREW.N0000" },
    { name: "Ceylon Cold Stores", symbol: "CCS.N0000" },
    { name: "Ceylon Grain Elevators", symbol: "GRAN.N0000" },
    { name: "Ceylon Guardian Investment Trust", symbol: "GUAR.N0000" },
    { name: "Ceylon Hospitals", symbol: "CHL.N0000" },
    { name: "Ceylon Hotels Corporation", symbol: "CHOT.N0000" },
    { name: "Ceylon Investment", symbol: "CINV.N0000" },
    { name: "Ceylon Printers", symbol: "CPRT.N0000" },
    { name: "Ceylon Tea Brokers", symbol: "CTBL.N0000" },
    { name: "Ceylon Tobacco Company", symbol: "CTC.N0000" },
    { name: "Chemanex", symbol: "CHMX.N0000" },
    { name: "Chevron Lubricants Lanka", symbol: "LLUB.N0000" },
    { name: "Chrissworld", symbol: "CWL.N0000" },
    { name: "CIC Holdings", symbol: "CIC.N0000" },
    { name: "Citizens Development Business Finance", symbol: "CDB.N0000" },
    { name: "Citrus Leisure", symbol: "REEF.N0000" },
    { name: "Co-Operative Insurance Company", symbol: "COOP.N0000" },
    { name: "Colombo City Holdings", symbol: "PHAR.N0000" },
    { name: "Colombo Dockyard", symbol: "DOCK.N0000" },
    { name: "Colombo Fort Investments", symbol: "CFI.N0000" },
    { name: "Colombo Investment Trust", symbol: "CIT.N0000" },
    { name: "Colombo Land and Development Company", symbol: "CLND.N0000" },
    { name: "Commercial Bank of Ceylon", symbol: "COMB.N0000" },
    { name: "Commercial Credit & Finance", symbol: "COCR.N0000" },
    { name: "Commercial Development Company", symbol: "COMD.N0000" },
    { name: "Convenience Foods (Lanka)", symbol: "SOY.N0000" },

    // D
    { name: "Dankotuwa Porcelain", symbol: "DPL.N0000" },
    { name: "DFCC Bank", symbol: "DFCC.N0000" },
    { name: "Dialog Axiata", symbol: "DIAL.N0000" },
    { name: "Dialog Finance", symbol: "CALF.N0000" },
    { name: "Diesel & Motor Engineering", symbol: "DIMO.N0000" },
    { name: "Digital Mobility Solutions Lanka", symbol: "PKME.N0000" },
    { name: "Dilmah Ceylon Tea Company", symbol: "CTEA.N0000" },
    { name: "Dipped Products", symbol: "DIPD.N0000" },
    { name: "Distilleries Company of Sri Lanka", symbol: "DIST.N0000" },
    { name: "Dolphin Hotels", symbol: "STAF.N0000" },

    // E
    { name: "E. B. Creasy & Company", symbol: "EBCR.N0000" },
    { name: "E M L Consultants", symbol: "EML.N0000" },
    { name: "E-Channelling", symbol: "ECL.N0000" },
    { name: "East West Properties", symbol: "EAST.N0000" },
    { name: "Eastern Merchants", symbol: "EMER.N0000" },
    { name: "Eden Hotel Lanka", symbol: "EDEN.N0000" },
    { name: "Elpitiya Plantations", symbol: "ELPL.N0000" },
    { name: "Equity Two", symbol: "ETWO.N0000" },
    { name: "Ex-pack Corrugated Cartons", symbol: "PACK.N0000" },
    { name: "Expolanka Holdings", symbol: "EXPO.N0000" },
    { name: "Exterminators", symbol: "EXT.N0000" },

    // F
    { name: "First Capital Holdings", symbol: "CFVF.N0000" },
    { name: "First Capital Treasuries", symbol: "FCT.N0000" },

    // G
    { name: "Galadari Hotels (Lanka)", symbol: "GHLL.N0000" },
    { name: "Galle Face Capital Partners", symbol: "WAPO.N0000" },
    { name: "Gestetner of Ceylon", symbol: "GEST.N0000" },
    { name: "Greentech Energy", symbol: "MEL.N0000" },

    // H
    { name: "Hapugastenne Plantations", symbol: "HAPU.N0000" },
    { name: "Harischandra Mills", symbol: "HARI.N0000" },
    { name: "Hatton National Bank", symbol: "HNB.N0000" },
    { name: "Hatton Plantations", symbol: "HPL.N0000" },
    { name: "Haycarb", symbol: "HAYC.N0000" },
    { name: "Hayleys Fabric", symbol: "MGT.N0000" },
    { name: "Hayleys Fibre", symbol: "HEXP.N0000" },
    { name: "Hayleys Leisure", symbol: "CONN.N0000" },
    { name: "Hayleys", symbol: "HAYL.N0000" },
    { name: "Hela Apparel Holdings", symbol: "HELA.N0000" },
    { name: "Hemas Holdings", symbol: "HHL.N0000" },
    { name: "Hikkaduwa Beach Resort", symbol: "CITH.N0000" },
    { name: "HNB Assurance", symbol: "HASU.N0000" },
    { name: "HNB Finance", symbol: "HNBF.N0000" },
    { name: "Horana Plantations", symbol: "HOPL.N0000" },
    { name: "Hotel Sigiriya", symbol: "HSIG.N0000" },
    { name: "HDFC Bank of Sri Lanka", symbol: "HDFC.N0000" },
    { name: "hSenid Business Solutions", symbol: "HBS.N0000" },
    { name: "Hunas Holdings", symbol: "HUNA.N0000" },
    { name: "Hunters & Company", symbol: "HUNT.N0000" },
    { name: "HVA Foods", symbol: "HVA.N0000" },

    // I
    { name: "Industrial Asphalts (Lanka)", symbol: "ASPH.N0000" },

    // J
    { name: "Janashakthi Insurance", symbol: "JINS.N0000" },
    { name: "JAT Holdings", symbol: "JAT.N0000" },
    { name: "Jetwing Symphony", symbol: "JETS.N0000" },
    { name: "John Keells Holdings", symbol: "JKH.N0000" },
    { name: "John Keells Hotels", symbol: "KHL.N0000" },
    { name: "John Keells", symbol: "JKL.N0000" },

    // K
    { name: "Kahawatte Plantations", symbol: "KAHA.N0000" },
    { name: "Kapruka Holdings", symbol: "KPHL.N0000" },
    { name: "Keells Food Products", symbol: "KFP.N0000" },
    { name: "Kegalle Plantations", symbol: "KGAL.N0000" },
    { name: "Kelani Cables", symbol: "KCAB.N0000" },
    { name: "Kelani Tyres", symbol: "TYRE.N0000" },
    { name: "Kelani Valley Plantations", symbol: "KVAL.N0000" },
    { name: "Kelsey Developments", symbol: "KDL.N0000" },
    { name: "Kotagala Plantations", symbol: "KOTA.N0000" },
    { name: "Kotmale Holdings", symbol: "LAMB.N0000" },

    // L
    { name: "LB Finance", symbol: "LFIN.N0000" },
    { name: "Lake House Printers & Publishers", symbol: "LPRT.N0000" },
    { name: "Lanka Aluminium Industries", symbol: "LALU.N0000" },
    { name: "Lanka Ashok Leyland", symbol: "ASHO.N0000" },
    { name: "Lanka Ceramic", symbol: "CERA.N0000" },
    { name: "Lanka Credit & Business Finance", symbol: "LCBF.N0000" },
    { name: "Lanka IOC", symbol: "LIOC.N0000" },
    { name: "Lanka Milk Foods (CWE)", symbol: "LMF.N0000" },
    { name: "Lanka Realty Investments", symbol: "ASCO.N0000" },
    { name: "Lanka Tiles", symbol: "TILE.N0000" },
    { name: "Lanka Ventures", symbol: "LVEN.N0000" },
    { name: "Lanka Walltiles", symbol: "LWL.N0000" },
    { name: "Lankem Ceylon", symbol: "LCEY.N0000" },
    { name: "Lankem Developments", symbol: "LDEV.N0000" },
    { name: "LAUGFS Gas", symbol: "LGL.N0000" },
    { name: "LAUGFS Power", symbol: "LPL.N0000" },
    { name: "Laxapana Batteries", symbol: "LITE.N0000" },
    { name: "Lee Hedges", symbol: "SHAW.N0000" },
    { name: "Lion Brewery Ceylon", symbol: "LION.N0000" },
    { name: "LOLC Finance", symbol: "LOFC.N0000" },
    { name: "LOLC General Insurance", symbol: "LGIL.N0000" },
    { name: "LOLC Holdings", symbol: "LOLC.N0000" },
    { name: "Lotus Hydro Power", symbol: "HPFL.N0000" },
    { name: "Luminex", symbol: "LUMX.N0000" },
    { name: "LVL Energy Fund", symbol: "LVEF.N0000" },

    // M
    { name: "Madulsima Plantations", symbol: "MADU.N0000" },
    { name: "Maharaja Foods", symbol: "MFPE.N0000" },
    { name: "Mahaweli Coconut Plantations", symbol: "MCPL.N0000" },
    { name: "Mahaweli Reach Hotels", symbol: "MRH.N0000" },
    { name: "Malwatte Valley Plantations", symbol: "MAL.N0000" },
    { name: "Marawila Resorts", symbol: "MARA.N0000" },
    { name: "Maskeliya Plantations", symbol: "MASK.N0000" },
    { name: "Melstacorp", symbol: "MELS.N0000" },
    { name: "Mercantile Investments and Finance", symbol: "MERC.N0000" },
    { name: "Mercantile Shipping Company", symbol: "MSL.N0000" },
    { name: "Merchant Bank of Sri Lanka & Finance", symbol: "MBSL.N0000" },
    { name: "Millennium Housing Developers", symbol: "MHDL.N0000" },
    { name: "Muller & Phipps (Ceylon)", symbol: "MULL.N0000" },
    { name: "Multi Finance", symbol: "MFL.N0000" },
    { name: "Myland Development", symbol: "MDL.N0000" },

    // N
    { name: "Namunukula Plantations", symbol: "NAMU.N0000" },
    { name: "Nation Lanka Finance", symbol: "CSF.N0000" },
    { name: "National Development Bank", symbol: "NDB.N0000" },
    { name: "Nations Trust Bank", symbol: "NTB.N0000" },
    { name: "Nawaloka Hospitals", symbol: "NHL.N0000" },

    // O
    { name: "Odel", symbol: "ODEL.N0000" },
    { name: "Office Equipment", symbol: "OFEQ.N0000" },
    { name: "On'ally Holdings", symbol: "ONAL.N0000" },
    { name: "Orient Finance", symbol: "BFN.N0000" },
    { name: "Overseas Realty (Ceylon)", symbol: "OSEA.N0000" },

    // P
    { name: "Palm Garden Hotels", symbol: "PALM.N0000" },
    { name: "Pan Asia Banking Corporation", symbol: "PABC.N0000" },
    { name: "Panasian Power", symbol: "PAP.N0000" },
    { name: "Paragon Ceylon", symbol: "PARA.N0000" },
    { name: "Pegasus Hotels of Ceylon", symbol: "PEG.N0000" },
    { name: "People's Insurance", symbol: "PINS.N0000" },
    { name: "People's Leasing & Finance", symbol: "PLC.N0000" },
    { name: "PGP Glass Ceylon", symbol: "GLAS.N0000" },
    { name: "PMF Finance", symbol: "PMB.N0000" },
    { name: "Prime Lands Residencies", symbol: "PLR.N0000" },
    { name: "Printcare", symbol: "CARE.N0000" },

    // R
    { name: "R I L Property", symbol: "RIL.N0000" },
    { name: "Radiant Gems International", symbol: "RGEM.N0000" },
    { name: "Raigam Wayamba Salterns", symbol: "RWSL.N0000" },
    { name: "Ramboda Falls", symbol: "RFL.N0000" },
    { name: "Regnis (Lanka)", symbol: "REG.N0000" },
    { name: "Renuka Agri Foods", symbol: "RAL.N0000" },
    { name: "Renuka City Hotels", symbol: "RENU.N0000" },
    { name: "Renuka Foods", symbol: "COCO.N0000" },
    { name: "Renuka Holdings", symbol: "RHL.N0000" },
    { name: "Renuka Hotels", symbol: "RCH.N0000" },
    { name: "Resus Energy", symbol: "HPWR.N0000" },
    { name: "Richard Pieris and Company", symbol: "RICH.N0000" },
    { name: "Richard Pieris Exports", symbol: "REXP.N0000" },
    { name: "Royal Ceramics Lanka", symbol: "RCL.N0000" },
    { name: "Royal Palms Beach Hotels", symbol: "RPBH.N0000" },

    // S
    { name: "Sampath Bank", symbol: "SAMP.N0000" },
    { name: "Samson International", symbol: "SIL.N0000" },
    { name: "Sanasa Development Bank", symbol: "SDB.N0000" },
    { name: "Sarvodaya Development Finance", symbol: "SDF.N0000" },
    { name: "Sathosa Motors", symbol: "SMOT.N0000" },
    { name: "Senkadagala Finance", symbol: "SFCL.N0000" },
    { name: "Serendib Engineering Group", symbol: "IDL.N0000" },
    { name: "Serendib Hotels", symbol: "SHOT.N0000" },
    { name: "Serendib Land", symbol: "SLND.N0000" },
    { name: "Seylan Bank", symbol: "SEYB.N0000" },
    { name: "Seylan Developments", symbol: "CSD.N0000" },
    { name: "Shaw Wallace Investments", symbol: "KZOO.N0000" },
    { name: "Sierra Cables", symbol: "SIRA.N0000" },
    { name: "Sigiriya Village Hotels", symbol: "SIGV.N0000" },
    { name: "Singer (Sri Lanka)", symbol: "SINS.N0000" },
    { name: "Singer Finance (Lanka)", symbol: "SFIN.N0000" },
    { name: "Singer Industries (Ceylon)", symbol: "SINI.N0000" },
    { name: "Singhe Hospitals", symbol: "SINH.N0000" },
    { name: "SMB Finance", symbol: "SEMB.N0000" },
    { name: "Softlogic Capital", symbol: "SCAP.N0000" },
    { name: "Softlogic Finance", symbol: "CRL.N0000" },
    { name: "Softlogic Holdings", symbol: "SHL.N0000" },
    { name: "Softlogic Life Insurance", symbol: "AAIC.N0000" },
    { name: "Sri Lanka Telecom", symbol: "SLTL.N0000" },
    { name: "Standard Capital", symbol: "SING.N0000" },
    { name: "Sunshine Holdings", symbol: "SUN.N0000" },
    { name: "Swadeshi Industrial Works", symbol: "SWAD.N0000" },
    { name: "Swisstek (Ceylon)", symbol: "PARQ.N0000" },

    // T
    { name: "TAL Lanka Hotels", symbol: "TAJ.N0000" },
    { name: "Talawakelle Tea Estates", symbol: "TPL.N0000" },
    { name: "Tangerine Beach Hotels", symbol: "TANG.N0000" },
    { name: "Tea Smallholder Factories", symbol: "TSML.N0000" },
    { name: "Teejay Lanka", symbol: "TJL.N0000" },
    { name: "Tess Agro", symbol: "TESS.N0000" },
    { name: "The Autodrome", symbol: "AUTO.N0000" },
    { name: "The Colombo Fort Land & Building", symbol: "CFLB.N0000" },
    { name: "The Fortress Resorts", symbol: "RHTL.N0000" },
    { name: "The Kandy Hotels Company (1938)", symbol: "KHC.N0000" },
    { name: "The Kingsbury", symbol: "SERV.N0000" },
    { name: "The Lanka Hospitals Corporation", symbol: "LHCL.N0000" },
    { name: "The Lighthouse Hotel", symbol: "LHL.N0000" },
    { name: "The Nuwara Eliya Hotels Company", symbol: "NEH.N0000" },
    { name: "Three Acre Farms", symbol: "TAFL.N0000" },
    { name: "Tokyo Cement Company (Lanka)", symbol: "TKYO.N0000" },
    { name: "Trans Asia Hotels", symbol: "TRAN.N0000" },

    // U
    { name: "UB Finance", symbol: "UBF.N0000" },
    { name: "Udapussellawa Plantations", symbol: "UDPL.N0000" },
    { name: "Union Assurance", symbol: "UAL.N0000" },
    { name: "Union Bank of Colombo", symbol: "UBC.N0000" },
    { name: "Union Chemicals Lanka", symbol: "UCAR.N0000" },
    { name: "Unisyst Engineering", symbol: "ALUF.N0000" },
    { name: "United Motors Lanka", symbol: "UML.N0000" },

    // V
    { name: "Vallibel Finance", symbol: "VFIN.N0000" },
    { name: "Vallibel One", symbol: "VONE.N0000" },
    { name: "Vallibel Power Erathna", symbol: "VPEL.N0000" },
    { name: "Vidullanka", symbol: "VLL.N0000" },

    // W
    { name: "Waskaduwa Beach Resort", symbol: "CITW.N0000" },
    { name: "Watawala Plantations", symbol: "WATA.N0000" },
    { name: "WindForce", symbol: "WIND.N0000" },

    // Y
    { name: "York Arcade Holdings", symbol: "YORK.N0000" },
]

/**
 * Search companies by name or symbol
 * @param query - Search query string
 * @returns Filtered array of companies matching the query
 */
export function searchCompanies(query: string): CseCompany[] {
    if (!query.trim()) {
        return []
    }

    const lowerQuery = query.toLowerCase()

    return CSE_COMPANIES.filter(company =>
        company.name.toLowerCase().includes(lowerQuery) ||
        company.symbol.toLowerCase().includes(lowerQuery)
    )
}

/**
 * Get a list of popular/example companies to show when search is empty
 */
export function getPopularCompanies(): CseCompany[] {
    return [
        CSE_COMPANIES.find(c => c.symbol === "JKH.N0000")!,
        CSE_COMPANIES.find(c => c.symbol === "DIAL.N0000")!,
        CSE_COMPANIES.find(c => c.symbol === "COMB.N0000")!,
        CSE_COMPANIES.find(c => c.symbol === "HNB.N0000")!,
        CSE_COMPANIES.find(c => c.symbol === "SAMP.N0000")!,
        CSE_COMPANIES.find(c => c.symbol === "ALUM.N0000")!,
        CSE_COMPANIES.find(c => c.symbol === "SLTL.N0000")!,
        CSE_COMPANIES.find(c => c.symbol === "HAYL.N0000")!,
    ].filter(Boolean)
}
