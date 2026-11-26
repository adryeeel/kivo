import '../../../../../styles/global.css';

import { render } from 'vitest-browser-react';

import { Button } from '@kivo/ui/primitive/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioItem,
    DropdownMenuRadioGroup,
} from '@kivo/ui/primitive/dropdown-menu';

export function renderMenu() {
    return render(
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button />}>Open choices</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value='one' aria-label='Choices'>
                    <DropdownMenuRadioItem value='one'>One</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>,
    );
}
