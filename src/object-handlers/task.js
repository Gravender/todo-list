class task {
        constructor(title, description, dueDate, priority, notes = 'add notes here', completed = false, isExpanded = false) {
                this.title = title;
                this.description = description;
                this.dueDate = dueDate;
                this.priority = priority;
                this.notes = notes;
                this.completed = completed;
                this.isExpanded = isExpanded;
        }
        isEqual(comparator) {
                return this.title == comparator.title &&
                        this.description == comparator.description &&
                        this.dueDate == comparator.dueDate &&
                        this.priority == comparator.priority &&
                        this.notes == comparator.notes &&
                        this.completed == comparator.completed &&
                        this.isExpanded == comparator.isExpanded;
                        
        }
}
export { task }
