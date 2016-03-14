import { DOMElement, ReactNode } from 'react';

import { BEMEntity } from 'rebem-classname';

export interface BEMFactory {
    (props: BEMEntity, ...children: ReactNode[]): DOMElement<BEMEntity>;
}

declare function BEM(props: BEMEntity, ...children: ReactNode[]): DOMElement<BEMEntity>;

declare function blockFactory(block: string): BEMFactory;

export { BEM, blockFactory };
