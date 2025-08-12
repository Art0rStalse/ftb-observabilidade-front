import { ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface FilterAndNavigationProps {
    searchParams:  ReadonlyURLSearchParams;
    router: AppRouterInstance;
    pathname: string;
    totalPages: number;
    page: number;
}

function FilterAndNavigation({router, searchParams, pathname, page, totalPages}: FilterAndNavigationProps) {

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="pagination-controls">
            <button
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page <= 1}
            >
                Previous
            </button>

            <span>Page {page} of {totalPages}</span>

            <button
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
            >
                Next
            </button>
        </div>
    )
}

export default FilterAndNavigation;