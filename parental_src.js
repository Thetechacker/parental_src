class CRC32 {
    constructor(){
        this.gentable()
    }

    crc32(input = "", crc = 0xFFFFFFFFn){
        var count = input.length

        var i = 0

        while(count != 0){
            count -= 1

            var temp1 = BigInt((crc >> 8n) & 0xFFFFFFn)
            var temp2 = this.table[(crc ^ BigInt(input.charCodeAt(i))) & 0xFFn]

            crc = temp1 ^ temp2

            i += 1
        }

        return parseInt(crc)
    }

    gentable(){
        this.table = []

        for(var i = 0n; i < 256; i++){
            var crc = i
            
            for(var j = 0; j < 8; j++){
                if(crc & 1n){
                    crc = (crc >> 1n) ^ 0xEDB88320n
                } else {
                    crc >>= 1n
                }
            }

            this.table.push(crc)
        }
    }
}

function fixedInt(int = 0, length = 0){
    if(typeof int !== "number" || typeof length !== "number" || !isFinite(int) || !isFinite(length) || isNaN(int) || isNaN(length)) return null

    int = int.toString()

    var l = length - int.length

    return l <= 0 ? int : "0".repeat(l) + int
}

function process(num = "", date = new Date()){
    if(typeof num !== "string" || num.length !== 8 || isNaN(num)){
        return null
    } else {
        return parseInt(((BigInt(new CRC32().crc32(`${fixedInt(date.getMonth() + 1, 2)}${fixedInt(date.getDate(), 2)}${num.slice(4, 8)}`)) ^ 0xAAAAn) + 0x14C1n) % 100000n)
    }
}

console.log(process("27281938"))