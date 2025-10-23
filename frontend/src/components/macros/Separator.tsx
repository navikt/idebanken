export function Separator({
    className = 'mt-(--ax-space-12) mb-(--ax-space-16)',
}: {
    className?: string
}) {
    return <hr className={`separator ${className}`} />
}
