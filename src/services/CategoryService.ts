interface CategoryService {
	createCategory(category_name: string): Promise<string>
	deleteCategory(category_id: string): Promise<string>
	listCategories(): Promise<object[]>
}

export { CategoryService }