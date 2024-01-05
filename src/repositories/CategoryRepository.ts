interface CategoryRepository {
	createCategory(category_name: string): Promise<void>
	deleteCategory(category_id: string): Promise<void>

	listCategories(): Promise<object[]>
	findCategory(category_id: string): Promise<boolean>
}

export { CategoryRepository }