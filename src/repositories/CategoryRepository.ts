interface CategoryRepository {
	createCategory(category_name: string): Promise<string>
	deleteCategory(category_id: string): Promise<string>
	listCategories(): Promise<object[]>
	findCategory(category_id: string): Promise<boolean>
}

export { CategoryRepository }