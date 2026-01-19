interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                </span>
                <div className="space-x-2">
                    <button
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                        className="px-3 py-1 border rounded text-yellow-600 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        disabled={page >= totalPages}
                        onClick={() =>  onPageChange(page + 1)}
                        className="px-3 py-1 border rounded text-green-600 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
    )   
}