interface CategoryService {
	createCategory(category_name: any): Promise<void>
	deleteCategory(category_id: any): Promise<void>
	listCategories(): Promise<object[]>
}

export { CategoryService }