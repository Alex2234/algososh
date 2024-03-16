export class Node<T> {
	value: T
	next: Node<T> | null
	constructor(value: T, next?: Node<T> | null) {
		this.value = value
		this.next = next === undefined ? null : next
	}
}

interface ILinkedList<T> {
	prepend(item: T): void
	append(item: T): void
	addByIndex(item: T, index: number): void
	deleteByIndex(item: T, index: number): void
	deleteHead(): void
	deleteTail(): void
	toArray(): void
}

export class LinkedList<T extends string> implements ILinkedList<T> {
	private head: Node<T> | null
	private tail: Node<T> | null
	private size: number

	constructor(initialArr: T[]) {
		this.head = null
		this.tail = null
		this.size = 0
		initialArr.forEach(item => this.append(item))
	}

	append(item: T) {
		const node = new Node(item)

		if (this.tail) {
			this.tail.next = node
		}

		if (!this.head) {
			this.head = node
		}

		this.tail = node

		this.size++
	}

	prepend(item: T) {
		const node = new Node(item, this.head)
		this.head = node
		if (!this.tail) {
			this.tail = node
		}
		this.size++
	}

	addByIndex(item: T, index: number) {
		if (index < 0 || index > this.size) {
			console.log('Enter a valid index')
			return
		} else {
			if (index === 0) {
				this.prepend(item)
			} else {
				const node = new Node(item)
				let curr = this.head
				let prev = null
				let currIndex = 0

				while (currIndex < index && curr !== null) {
					prev = curr
					curr = curr.next
					currIndex++
				}

				if (prev !== null) {
					node.next = curr
					prev.next = node
				}
			}

			this.size++
		}
	}

	deleteByIndex(item: T, index: number) {
		if (index < 0 || index >= this.size) {
			console.log('Enter a valid index')
			return
		}
		if (index === 0) {
			this.deleteHead()
		} else {
			let curr = this.head
			let prev = null
			for (let i = 0; i < index; i++) {
				prev = curr
				curr = curr?.next || null
			}
			if (prev !== null && curr !== null) {
				prev.next = curr.next
				curr.next = null
				this.size--
			}
		}
	}

	deleteHead() {
		if (this.head !== null) {
			this.head = this.head.next
			this.size--
		}
	}

	deleteTail() {
		if (!this.head) return
		if (!this.head.next) {
			this.head = null
		} else {
			let curr = this.head
			let prev = null
			while (curr.next) {
				prev = curr
				curr = curr.next
			}
			if (prev) prev.next = null
		}
		this.size--
	}

	toArray() {
		let curr = this.head
		let arr: T[] = []
		while (curr) {
			arr.push(curr.value)
			curr = curr.next
		}
		return arr
	}

	getSize() {
		return this.size
	}
}
