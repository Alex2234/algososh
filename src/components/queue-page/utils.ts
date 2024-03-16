interface IQueue<T> {
	enqueue(item: T): void
	dequeue(): void
	clear(): void
	isEmpty(): boolean
	getElements(): void
	getHead(): void
	getTail(): void
}

export class Queue<T extends string> implements IQueue<T> {
	private container: (T | null)[]
	private headIndex = 0
	private tailIndex = 0
	private size: number
	private length: number = 0

	constructor(size: number) {
		this.size = size
		this.container = Array(size).fill(null)
	}

	enqueue = (item: T) => {
		if (this.length >= this.size) {
			throw new Error('Maximum length exceeded')
		}

		this.container[this.tailIndex] = item
		this.tailIndex = (this.tailIndex + 1) % this.size
		this.length++

		return item
	}

	dequeue = () => {
		if (this.isEmpty()) {
			throw new Error('No elements in the queue')
		}

		this.container[this.headIndex] = null
		this.headIndex = (this.headIndex + 1) % this.size
		this.length--
	}

	clear(): void {
		this.container = []
		this.headIndex = 0
		this.tailIndex = 0
		this.length = 0
	}

	getLength(): number {
		return this.length
	}

	getElements(): (T | null)[] {
		return this.container
	}

	isEmpty(): boolean {
		return this.length === 0
	}

	getHead(): number {
		return this.headIndex
	}

	getTail(): number {
		return this.tailIndex === 0 ? this.size - 1 : this.tailIndex - 1
	}
}
