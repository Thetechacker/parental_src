class CRC32 {
    constructor(){
        this.gentable()
    }

    crc32(input = "", crc = 0xFFFFFFFFn){
        var count = input.length

        var i = 0

        while(count !== 0){
            count--

            var temp1 = (crc >> 8n) & 0xFFFFFFn
            var temp2 = this.table[(crc ^ BigInt(input.charCodeAt(i))) & 0xFFn]

            crc = temp1 ^ temp2

            i++
        }

        return crc
    }

    gentable(){
        this.table = []

        for(var i = 0; i < 256; i++){
            var crc = BigInt(i)

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

const isInvalidInteger = (anyInt) => (isNaN(anyInt) || anyInt.toString().includes("e") || !isFinite(anyInt) || !Number.isInteger(anyInt) || !Number.isSafeInteger(anyInt))

function fixedInt(int = 0, length = 0){
    if([int, length].some(k => isInvalidInteger(k))) return null

    int = int.toString()

    var l = length - int.length

    return l <= 0 ? int : "0".repeat(l) + int
}

function process(num){
    if(typeof num !== "string" || num.length !== 8 || isNaN(num)) return null

    const curDate = new Date()

    return BigInt((new CRC32().crc32((`${fixedInt(curDate.getMonth() + 1, 2)}${fixedInt(curDate.getDate(), 2)}` + num.slice(4, 8))) ^ 0xAAAAn) + 0x14C1n) % 100000n
}

console.log(parseInt(process("27281938")))