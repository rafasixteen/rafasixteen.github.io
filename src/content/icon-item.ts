import type { ReactElement } from "react";

/** A content item before a locale-specific name is added. */
export interface IconItemSource {
	id: string;
	icon: ReactElement;
}

/** A named content item rendered with an icon. */
export interface IconItem extends IconItemSource {
	name: string;
}
