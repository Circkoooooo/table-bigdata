/**
 * 在min和max中循环，根据currentIndex来返回对应索引的ascii字符。例如asciiMin为65，当索引为0的时候也就是返回ascii65所对应的字符。超过asciiMax的时候
 * 会从asciiMin开始循环。
 * @param currentIndex
 * @param asciiLMin
 * @param asciiMax
 * @returns
 */
export function getLoopValue(currentIndex: number, asciiMin: number, asciiMax: number) {
	const loopValue = (currentIndex - asciiMin) % (asciiMax - asciiMin + 1)

	return String.fromCharCode(loopValue + asciiMin)
}

/**
 * 对数组中的值从后往前进行自增进位
 * 如果是空数组[]，则传入最小的值minPrefixCode，否则对最后的值进行自增，最后一个值如果大于maxPrefixCode则将它置为minPrefixCode，向前进位。
 *
 * 例如当minPrefixCode=65，maxPrefixCode=90。用=>来表示这个函数的调用
 * 那么当prefixArray为如下值的时候，经过处理后prefixArray中的值变化如下
 * prefixArray=[65]  =>  [66]
 * prefixArray=[90]     =>  [65,65]
 * prefixArray=[65,65]  =>  [65,66]
 * prefixArray=[]       =>  [65]
 * prefixArray=[90,90]  =>  [65,65,65]
 *
 * @param prefixArray
 * @param minPrefixCode
 * @param maxPrefixCode
 */
function resolvePrefixArray(prefixArray: number[], minPrefixCode: number, maxPrefixCode: number) {
	if (prefixArray.length === 0) {
		prefixArray[0] = minPrefixCode
	} else {
		if (prefixArray.length === 1) {
			if (prefixArray[0] === maxPrefixCode) {
				prefixArray[0] = minPrefixCode
				prefixArray.unshift(minPrefixCode)
			} else {
				prefixArray[0]++
			}
		} else {
			for (let i = prefixArray.length - 1, carry = false; i >= 0; i--) {
				//最后一个索引
				if (i === prefixArray.length - 1) {
					if (prefixArray[i] === maxPrefixCode) {
						carry = true
						prefixArray[i] = minPrefixCode
					} else {
						prefixArray[i]++
					}
				} else {
					if (carry) {
						carry = false

						if (prefixArray[i] === maxPrefixCode) {
							carry = true
							prefixArray[i] = minPrefixCode

							if (i === 0) {
								prefixArray.unshift(minPrefixCode)
							}
						} else {
							prefixArray[i]++
						}
					}
				}
			}
		}
	}
}

/**
 * 生成ascii码区间内符合A - Z .. AA - AZ .. AAA AAB - ZZZ ...规则的取值数组
 *
 */
export const getLabel = (columnCount: number, asciiMin: number | string, asciiMax: number | string): string[] => {
	const asciiLimit: number[] = []
	const result: string[] = []

	if (typeof asciiMin === "number") {
		asciiLimit.push(asciiMin)
	} else if (typeof asciiMin === "string") {
		asciiLimit.push(asciiMin.charCodeAt(0))
	}

	if (typeof asciiMax === "number") {
		asciiLimit.push(asciiMax)
	} else if (typeof asciiMax === "string") {
		asciiLimit.push(asciiMax.charCodeAt(0))
	}

	//前缀
	const previousPrefixCode = {
		prefixes: [] as number[],
		needAddPrefix: false,
	}

	// 遍历columnCount次，push的内容为 A B .... Z AA AB AC .... BA ..ZZ ...AAA AAB ...
	for (let i = asciiLimit[0]; i < asciiLimit[0] + columnCount; i++) {
		const currentLoopValue = ((i - asciiLimit[0]) % (asciiLimit[1] - asciiLimit[0] + 1)) + asciiLimit[0]

		//判断是否存在要在赋值`needAddPrefix`变量之前，因为这是在下一轮循环中判断的。
		//如果有前缀标记，处理前缀数组
		if (previousPrefixCode.needAddPrefix) {
			previousPrefixCode.needAddPrefix = false
			resolvePrefixArray(previousPrefixCode.prefixes, asciiLimit[0], asciiLimit[1])
		}

		//判断是否为最后一个值，如果是，记录前缀标记
		if (currentLoopValue === asciiLimit[1]) {
			previousPrefixCode.needAddPrefix = true
		}

		//组合前缀和当前索引
		result.push(previousPrefixCode.prefixes.map((item) => String.fromCharCode(item)).join("") + String.fromCharCode(currentLoopValue))
	}
	return result
}

export const getRowLabel = (count: number, offset = 0): string[] => {
	const result: string[] = []

	result.push(...Array.from({ length: count }, (val, key) => key + 1 + offset).map((item) => item.toString()))

	return result
}
