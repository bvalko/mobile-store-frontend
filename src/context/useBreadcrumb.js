import { useContext } from 'react';

import { BreadcrumbContext } from './BreadcrumbContext';

export function useBreadcrumb() {
    return useContext(BreadcrumbContext);
}
