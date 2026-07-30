import { useState } from 'react';

import { BreadcrumbContext } from './BreadcrumbContext';

export function BreadcrumbProvider({ children }) {
    const [breadcrumbLabel, setBreadcrumbLabel] = useState(null);

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbLabel, setBreadcrumbLabel }}>
            {children}
        </BreadcrumbContext.Provider>
    );
}
