const prefixOptions = [
{value:"1", label: "ร้อยเอก ม.ร.ว."},
{value:"2", label: "ร้อยโท ม.ร.ว."},
{value:"3", label: "ร้อยตรี ม.ร.ว."},
{value:"4", label: "จ่าสิบเอก ม.ร.ว."},
{value:"5", label: "จ่าสิบโท ม.ร.ว."},
{value:"6", label: "จ่าสิบตรี ม.ร.ว."},
{value:"7", label: "สิบเอก ม.ร.ว."},
{value:"8", label: "สิบโท ม.ร.ว."},
{value:"9", label: "สิบตรี ม.ร.ว."},
{value:"10", label: "พลทหาร ม.ร.ว."},
{value:"11", label: "พลเรือเอก ม.ร.ว."},
{value:"12", label: "พลเรือโท ม.ร.ว."},
{value:"13", label: "พลเรือตรี ม.ร.ว."},
{value:"14", label: "นาวาเอกพิเศษ ม.ร.ว."},
{value:"15", label: "นาวาเอก ม.ร.ว."},
{value:"16", label: "นาวาโท ม.ร.ว."},
{value:"17", label: "นาวาตรี ม.ร.ว."},
{value:"18", label: "เรือเอก ม.ร.ว."},
{value:"19", label: "เรือโท ม.ร.ว."},
{value:"20", label: "เรือตรี ม.ร.ว."},
{value:"21", label: "พันจ่าเอก ม.ร.ว."},
{value:"22", label: "พันจ่าโท ม.ร.ว."},
{value:"23", label: "พันจ่าตรี ม.ร.ว."},
{value:"24", label: "จ่าเอก ม.ร.ว."},
{value:"25", label: "จ่าโท ม.ร.ว."},
{value:"26", label: "จ่าตรี ม.ร.ว."},
{value:"27", label: "พลทหารเรือ ม.ร.ว."},
{value:"28", label: "พลอากาศเอก ม.ร.ว."},
{value:"29", label: "พลอากาศโท ม.ร.ว."},
{value:"30", label: "พลอากาศตรี ม.ร.ว."},
{value:"31", label: "น.อ.พิเศษ ม.ร.ว."},
{value:"32", label: "นาวาอากาศเอก ม.ร.ว."},
{value:"33", label: "นาวาอากาศโท ม.ร.ว."},
{value:"34", label: "นาวาอากาศตรี ม.ร.ว."},
{value:"35", label: "เรืออากาศเอก ม.ร.ว."},
{value:"36", label: "เรืออากาศโท ม.ร.ว."},
{value:"37", label: "เรืออากาศตรี ม.ร.ว."},
{value:"38", label: "พ.อ.อ. ม.ร.ว."},
{value:"39", label: "พันจ่าอากาศโท ม.ร.ว."},
{value:"40", label: "พ.อ.ต. ม.ร.ว."},
{value:"41", label: "จ่าอากาศเอก ม.ร.ว."},
{value:"42", label: "จ่าอากาศโท ม.ร.ว."},
{value:"43", label: "จ่าอากาศตรี ม.ร.ว."},
{value:"44", label: "พลทหารอากาศ ม.ร.ว."},
{value:"45", label: "เรืออากาศตรี ม.ล."},
{value:"46", label: "พันจ่าอากาศเอก ม.ล."},
{value:"47", label: "พันจ่าอากาศโท ม.ล."},
{value:"48", label: "พันจ่าอากาศตรี ม.ล."},
{value:"49", label: "จ่าอากาศเอก ม.ล."},
{value:"50", label: "สมเด็จพระนางเจ้า"},
{value:"51", label: "เจ้าฟ้า"},
{value:"52", label: "พระเจ้าวรวงศ์เธอ"},
{value:"53", label: "พระวรวงศ์เธอ พระ"},
{value:"54", label: "พระองค์เจ้าหญิง"},
{value:"55", label: "ม.จ."},
{value:"56", label: "ม.จ.หญิง"},
{value:"57", label: "ม.ร.ว."},
{value:"58", label: "ม.ล."},
{value:"59", label: "หม่อม"},
{value:"60", label: "จอมพล"},
{value:"61", label: "จ่าสิบตำรวจ ม.ร.ว."},
{value:"62", label: "สิบตำรวจเอก ม.ร.ว."},
{value:"63", label: "สิบตำรวจโท ม.ร.ว."},
{value:"64", label: "สิบตำรวจตรี ม.ร.ว."},
{value:"65", label: "พลตำรวจ ม.ร.ว."},
{value:"66", label: "นรต. ม.ร.ว."},
{value:"67", label: "พลเอก ม.ล."},
{value:"68", label: "พลโท ม.ล."},
{value:"69", label: "พลตรี ม.ล."},
{value:"70", label: "พันเอก(พิเศษ) ม.ล."},
{value:"71", label: "พันเอก ม.ล."},
{value:"72", label: "พันโท ม.ล."},
{value:"73", label: "พันตรี ม.ล."},
{value:"74", label: "ร้อยเอก ม.ล."},
{value:"75", label: "ร้อยโท ม.ล."},
{value:"76", label: "ร้อยตรี ม.ล."},
{value:"77", label: "จ่าสิบเอก ม.ล."},
{value:"78", label: "จ่าสิบโท ม.ล."},
{value:"79", label: "จ่าสิบตรี ม.ล."},
{value:"80", label: "สิบเอก ม.ล."},
{value:"81", label: "สิบโท ม.ล."},
{value:"82", label: "สิบตรี ม.ล."},
{value:"83", label: "พลทหาร ม.ล."},
{value:"84", label: "พลเรือเอก ม.ล."},
{value:"85", label: "พลเรือโท ม.ล."},
{value:"86", label: "พลเรือตรี ม.ล."},
{value:"87", label: "นาวาเอกพิเศษ ม.ล."},
{value:"88", label: "นาวาเอก ม.ล."},
{value:"89", label: "นาวาโท ม.ล."},
{value:"90", label: "นาวาตรี ม.ล."},
{value:"91", label: "เรือเอก ม.ล."},
{value:"92", label: "เรือโท ม.ล."},
{value:"93", label: "เรือตรี ม.ล."},
{value:"94", label: "พันจ่าเอก ม.ล."},
{value:"95", label: "พันจ่าโท ม.ล."},
{value:"96", label: "พันจ่าตรี ม.ล."},
{value:"97", label: "จ่าเอก ม.ล."},
{value:"98", label: "จ่าโท ม.ล."},
{value:"99", label: "จ่าตรี ม.ล."},
{value:"100", label: "พลทหารเรือ ม.ล."},
{value:"101", label: "พลอากาศเอก ม.ล."},
{value:"102", label: "พลอากาศโท ม.ล."},
{value:"103", label: "พลอากาศตรี ม.ล."},
{value:"104", label: "น.อ.พิเศษ ม.ล."},
{value:"105", label: "นาวาอากาศเอก ม.ล."},
{value:"106", label: "นาวาอากาศโท ม.ล."},
{value:"107", label: "นาวาอากาศตรี ม.ล."},
{value:"108", label: "เรืออากาศเอก ม.ล."},
{value:"109", label: "เรืออากาศโท ม.ล."},
{value:"110", label: "สิบตำรวจเอก หญิง"},
{value:"111", label: "สิบตำรวจโท หญิง"},
{value:"112", label: "สิบตำรวจตรี หญิง"},
{value:"113", label: "พลตำรวจ หญิง"},
{value:"114", label: "จ่าอากาศโท ม.ล."},
{value:"115", label: "จ่าอากาศตรี ม.ล."},
{value:"116", label: "พลทหารอากาศ ม.ล."},
{value:"117", label: "พลตำรวจเอก ม.ล."},
{value:"118", label: "พลตำรวจโท ม.ล."},
{value:"119", label: "พลตำรวจตรี ม.ล."},
{value:"120", label: "พ.ต.อ.(พิเศษ) ม.ล."},
{value:"121", label: "พันตำรวจเอก ม.ล."},
{value:"122", label: "นักเรียนนายเรือ"},
{value:"123", label: "นักเรียนนายร้อยตำรวจ"},
{value:"124", label: "พันตำรวจโท ม.ล."},
{value:"125", label: "พันตำรวจตรี ม.ล."},
{value:"126", label: "ร้อยตำรวจเอก ม.ล."},
{value:"127", label: "ร้อยตำรวจโท ม.ล."},
{value:"128", label: "ร้อยตำรวจตรี ม.ล."},
{value:"129", label: "ดาบตำรวจ ม.ล."},
{value:"130", label: "จ่าสิบตำรวจ ม.ล."},
{value:"131", label: "สิบตำรวจเอก ม.ล."},
{value:"132", label: "สิบตำรวจโท ม.ล."},
{value:"133", label: "สิบตำรวจตรี ม.ล."},
{value:"134", label: "พลตำรวจ ม.ล."},
{value:"135", label: "นรต. ม.ล."},
{value:"136", label: "เอกอัครราชทูต"},
{value:"137", label: "สมเด็จพระสังฆราช"},
{value:"138", label: "สมเด็จพระพุฒาจารย์"},
{value:"139", label: "ว่าที่ร้อยเอก"},
{value:"140", label: "ว่าที่ร้อยโท"},
{value:"141", label: "ว่าที่ร้อยตรี"},
{value:"142", label: "ว่าที่เรือเอก"},
{value:"143", label: "ว่าที่เรือโท"},
{value:"144", label: "ว่าที่เรือตรี"},
{value:"145", label: "ว่าที่เรืออากาศเอก"},
{value:"146", label: "ว่าที่เรืออากาศโท"},
{value:"147", label: "ว่าที่เรืออากาศตรี"},
{value:"148", label: "ว่าที่ร้อยตำรวจเอก"},
{value:"149", label: "ว่าที่ร้อยตำรวจโท"},
{value:"150", label: "ว่าที่ร้อยตำรวจตรี"},
{value:"151", label: "พันตำรวจเอก(พิเศษ)"},
{value:"152", label: "พันตำรวจเอก"},
{value:"153", label: "พลตำรวจโท"},
{value:"154", label: "พลตำรวจตรี"},
{value:"155", label: "พันตำรวจโท"},
{value:"156", label: "พันตำรวจตรี"},
{value:"157", label: "ร้อยตำรวจเอก"},
{value:"158", label: "ร้อยตำรวจโท"},
{value:"159", label: "ร้อยตำรวจตรี"},
{value:"160", label: "ดาบตำรวจ"},
{value:"161", label: "จ่าสิบตำรวจ"},
{value:"162", label: "สิบตำรวจเอก"},
{value:"163", label: "สิบตำรวจโท"},
{value:"164", label: "สิบตำรวจตรี"},
{value:"165", label: "พลตำรวจ"},
{value:"166", label: "แม่ชี"},
{value:"167", label: "สามเณร"},
{value:"168", label: "ร.พ."},
{value:"169", label: "พันเอก(พิเศษ) หญิง"},
{value:"170", label: "พันเอก หญิง"},
{value:"171", label: "พันโท หญิง"},
{value:"172", label: "พันตรี หญิง"},
{value:"173", label: "ร้อยเอก หญิง"},
{value:"174", label: "ร้อยโท หญิง"},
{value:"175", label: "ร้อยตรี หญิง"},
{value:"176", label: "จ่าสิบเอก หญิง"},
{value:"177", label: "จ่าสิบโท หญิง"},
{value:"178", label: "จ่าสิบตรี หญิง"},
{value:"179", label: "สิบเอก หญิง"},
{value:"180", label: "สิบโท หญิง"},
{value:"181", label: "สิบตรี หญิง"},
{value:"182", label: "นาวาเอกพิเศษ หญิง"},
{value:"183", label: "นาวาเอก หญิง"},
{value:"184", label: "นาวาโท หญิง"},
{value:"185", label: "นาวาตรี หญิง"},
{value:"186", label: "เรือเอก หญิง"},
{value:"187", label: "เรือโท หญิง"},
{value:"188", label: "เรือตรี หญิง"},
{value:"189", label: "พันจ่าเอก หญิง"},
{value:"190", label: "พันจ่าโท หญิง"},
{value:"191", label: "พันจ่าตรี หญิง"},
{value:"192", label: "จ่าเอก หญิง"},
{value:"193", label: "จ่าโท หญิง"},
{value:"194", label: "จ่าตรี หญิง"},
{value:"195", label: "น.อ.พิเศษ หญิง"},
{value:"196", label: "นาวาอากาศเอก หญิง"},
{value:"197", label: "นาวาอากาศโท หญิง"},
{value:"198", label: "นาวาอากาศตรี หญิง"},
{value:"199", label: "เรืออากาศเอก หญิง"},
{value:"200", label: "เรืออากาศโท หญิง"},
{value:"201", label: "เรืออากาศตรี หญิง"},
{value:"202", label: "พันจ่าอากาศเอก หญิง"},
{value:"203", label: "พันจ่าอากาศโท หญิง"},
{value:"204", label: "พันจ่าอากาศตรี หญิง"},
{value:"205", label: "จ่าอากาศเอก หญิง"},
{value:"206", label: "จ่าอากาศโท หญิง"},
{value:"207", label: "จ่าอากาศตรี หญิง"},
{value:"208", label: "พ.ต.อ.(พิเศษ) หญิง"},
{value:"209", label: "พันตำรวจเอก หญิง"},
{value:"210", label: "พันตำรวจโท หญิง"},
{value:"211", label: "พันตำรวจตรี หญิง"},
{value:"212", label: "ร้อยตำรวจเอก หญิง"},
{value:"213", label: "ร้อยตำรวจโท หญิง"},
{value:"214", label: "ร้อยตำรวจตรี หญิง"},
{value:"215", label: "ดาบตำรวจ หญิง"},
{value:"216", label: "จ่าสิบตำรวจ หญิง"},
{value:"217", label: "บุตรนาง"},
{value:"218", label: "ด.ช."},
{value:"219", label: "ด.ญ."},
{value:"220", label: "นาย"},
{value:"221", label: "น.ส."},
{value:"222", label: "นาง"},
{value:"223", label: "พระบาทสมเด็จพระเจ้า "},
{value:"224", label: "พลเอก ม.ร.ว."},
{value:"225", label: "พลโท ม.ร.ว."},
{value:"226", label: "พลตรี ม.ร.ว."},
{value:"227", label: "พันเอก(พิเศษ) ม.ร.ว."},
{value:"228", label: "พันเอก ม.ร.ว."},
{value:"229", label: "พันโท ม.ร.ว."},
{value:"230", label: "พลเอก"},
{value:"231", label: "พลโท"},
{value:"232", label: "พลตรี"},
{value:"233", label: "พันเอก(พิเศษ)"},
{value:"234", label: "พันเอก"},
{value:"235", label: "พันโท"},
{value:"236", label: "พันตรี"},
{value:"237", label: "ร้อยเอก"},
{value:"238", label: "ร้อยโท"},
{value:"239", label: "ร้อยตรี"},
{value:"240", label: "จ่าสิบเอก"},
{value:"241", label: "จ่าสิบโท"},
{value:"242", label: "จ่าสิบตรี"},
{value:"243", label: "สิบเอก"},
{value:"244", label: "สิบโท"},
{value:"245", label: "สิบตรี"},
{value:"246", label: "พลทหาร"},
{value:"247", label: "จอมพลเรือ"},
{value:"248", label: "พลเรือเอก"},
{value:"249", label: "พลเรือโท"},
{value:"250", label: "พลเรือตรี"},
{value:"251", label: "นาวาเอกพิเศษ"},
{value:"252", label: "นาวาเอก"},
{value:"253", label: "นาวาโท"},
{value:"254", label: "นาวาตรี"},
{value:"255", label: "เรือเอก"},
{value:"256", label: "เรือโท"},
{value:"257", label: "เรือตรี"},
{value:"258", label: "พันจ่าเอก"},
{value:"259", label: "พันจ่าโท"},
{value:"260", label: "พันจ่าตรี"},
{value:"261", label: "จ่าเอก"},
{value:"262", label: "จ่าโท"},
{value:"263", label: "จ่าตรี"},
{value:"264", label: "พลทหารเรือ"},
{value:"265", label: "จอมพลอากาศ"},
{value:"266", label: "พลอากาศเอก"},
{value:"267", label: "พลอากาศโท"},
{value:"268", label: "พลอากาศตรี"},
{value:"269", label: "นาวาอากาศเอกพิเศษ"},
{value:"270", label: "นาวาอากาศเอก"},
{value:"271", label: "นาวาอากาศโท"},
{value:"272", label: "นาวาอากาศตรี"},
{value:"273", label: "เรืออากาศเอก"},
{value:"274", label: "เรืออากาศโท"},
{value:"275", label: "เรืออากาศตรี"},
{value:"276", label: "พันจ่าอากาศเอก"},
{value:"277", label: "พันจ่าอากาศโท"},
{value:"278", label: "พันจ่าอากาศตรี"},
{value:"279", label: "จ่าอากาศเอก"},
{value:"280", label: "จ่าอากาศโท"},
{value:"281", label: "จ่าอากาศตรี"},
{value:"282", label: "พลทหารอากาศ"},
{value:"283", label: "พลตำรวจโท ม.ร.ว."},
{value:"284", label: "พลตำรวจเอก"},
{value:"285", label: "พลตำรวจเอก ม.ร.ว."},
{value:"286", label: "พลตำรวจตรี ม.ร.ว."},
{value:"287", label: "พ.ต.อ.(พิเศษ) ม.ร.ว."},
{value:"288", label: "พันตำรวจเอก ม.ร.ว."},
{value:"289", label: "พันตำรวจโท ม.ร.ว."},
{value:"290", label: "พันตำรวจตรี ม.ร.ว."},
{value:"291", label: "ร้อยตำรวจเอก ม.ร.ว."},
{value:"292", label: "ร้อยตำรวจโท ม.ร.ว."},
{value:"293", label: "ร้อยตำรวจตรี ม.ร.ว."},
{value:"294", label: "ดาบตำรวจ ม.ร.ว."},
{value:"295", label: "พันตรี ม.ร.ว."},
{value:"296", label: "-"},
{value:"297", label: "พ.ภ."},
{value:"298", label: "พลตำรวจตรี หญิง"},
{value:"299", label: "พลตรี หญิง"},
{value:"300", label: "พลตำรวจเอก หญิง"},
{value:"301", label: "พลเรือเอก หญิง"},
{value:"302", label: "พลอากาศโท หญิง"},
{value:"303", label: "นักเรียนนายเรืออากาศ"},
{value:"304", label: "พันตรี หญิง มล."},
{value:"305", label: "พลตำรวจโท หญิง"},
{value:"306", label: "พลโท หญิง"},
{value:"307", label: "พลอากาศเอก หญิง"},
{value:"308", label: "พราหมณ์"},
{value:"309", label: "พลเอก หญิง"},
{value:"310", label: "คุณหญิง"},
{value:"311", label: "พลอากาศตรี หญิง"},
{value:"312", label: "ท่านผู้หญิง มรว."},
{value:"313", label: "นาวาตรี มจ."},
{value:"314", label: "พลตำรวจเอก(พิเศษ)"},
{value:"315", label: "พลเรือตรี หญิง"},
{value:"316", label: "พลเรือโท หญิง"},
{value:"317", label: "ว่าที่ร้อยตรี หญิง"},
{value:"318", label: "ว่าที่ร้อยตำรวจโท ญ."},
{value:"319", label: "คุณ"},
{value:"320", label: "ท่านผู้หญิง"},
{value:"321", label: "พลทหารอากาศ หญิง"},
{value:"322", label: "พันเอก คุณหญิง"},
{value:"323", label: "มล. คุณหญิง"},
{value:"324", label: "พลทหาร หญิง"},
{value:"325", label: "พลทหารเรือ หญิง"},
{value:"326", label: "สมเด็จพระ"},
{value:"327", label: "ว่าที่ร้อยตำรวจตรี ญ"},
{value:"328", label: "พ.ต.อ. ท่านผู้หญิง"},
{value:"329", label: "พญ."},
{value:"330", label: "พลอาสาสมัคร"},
{value:"331", label: "ว่าที่พันตรี"},
{value:"332", label: "นายกองเอก"},
{value:"333", label: "นรต.ญ."},
{value:"334", label: "ว่าที่พันโท"},
{value:"335", label: "ศ."},
{value:"336", label: "รศ."},
{value:"337", label: "ผศ."},
{value:"338", label: "พระพรหมจริยาจารย์"},
{value:"339", label: "นพ."},
{value:"340", label: "ศ.นพ."},
{value:"341", label: "ศ.พญ."},
{value:"342", label: "รศ.พญ."},
{value:"343", label: "ผศ.นพ."},
{value:"344", label: "ผศ.พญ."},
{value:"345", label: "รศ.นพ."}
]

const healthServiceOptions = [
{value:"1", label: "ข้าราชการ"},
{value:"2", label: "บัตรทอง"},
{value:"3", label: "ประกันสังคม"},
{value:"4", label: "ประกันสุขภาพ"},
{value:"5", label: "อื่นๆ"}
]

export {prefixOptions, healthServiceOptions};