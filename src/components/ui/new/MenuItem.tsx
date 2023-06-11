export interface MenuItemProps {
    icon: JSX.Element
    label: string
}

// The parent handles the rendering of this component, this component is only here for declarative reasons
export default function MenuItem(_: MenuItemProps): JSX.Element { return <></> }