interface Task {
	id: string
	text: string
}

interface List {
	id: string
	text: string
	tasks: Task[]
}

interface AppState {
	lists: List[]
	draggedItem: DragItem | undefined
}

interface NewItemFormProps {
	onAdd(text: string): void
}

interface AppStateContextProps {
	state: AppState
	dispatch: React.Dispatch<Action>
}

type Action =
	| { type: 'ADD_LIST'; payload: string }
	| { type: 'ADD_TASK'; payload: { text: string; listId: string } }
	| { type: 'MOVE_LIST'; payload: { dragIndex: number; hoverIndex: number } }
	| { type: 'SET_DRAGGED_ITEM'; payload: DragItem | undefined }

interface Item {
	id: string
}

type ColumnDragItem = {
	index: number
	id: string
	text: string
	type: 'COLUMN'
}

type CardDragItem = {
	id: string
	text: string
	type: 'CARD'
}

type DragItem = ColumnDragItem

interface DragPreviewContainerProps {
	isHidden?: boolean
	isPreview?: boolean
}

interface AddItemButtonProps {
	dark?: boolean
}
