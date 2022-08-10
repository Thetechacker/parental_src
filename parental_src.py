import time

def isNaN(string):
    if(type(string) != str):
        return False if type(string) == int else True
    else:
        try:
            int(string)

            return False
        except:
            return True

class CRC32:
    def __init__(self):
        self.gentable()

    def crc32(self, input = "", crc = 0xFFFFFFFF):
        count = len(input)

        i = 0

        while(count != 0):
            count -= 1

            temp1 = (crc >> 8) & 0xFFFFFF
            temp2 = self.table[(crc ^ ord(input[i])) & 0xFF]

            crc = temp1 ^ temp2

            i += 1
        
        return crc
    
    def gentable(self):
        self.table = []

        for i in range(256):
            crc = i

            for j in range(8):
                if(crc & 1):
                    crc = (crc >> 1) ^ 0xEDB88320
                else:
                    crc >>= 1
            
            self.table.append(crc)

def process(num):
    if(type(num) != str or len(num) != 8 or isNaN(num)):
        return None
    else:
        return ((CRC32().crc32((time.strftime("%m%d", time.gmtime(time.time())) + num[4:8])) ^ 0xAAAA) + 0x14C1) % 100000

print(process("27281938"))