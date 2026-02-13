const GITHUB_USERNAME = "teajuw";

export async function getGitHubActivity(): Promise<string | null> {
    try {
        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=1`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
        );

        if (!res.ok) return null;

        const events = await res.json();
        if (!events.length) return null;

        const lastEventDate = new Date(events[0].created_at);
        return formatRelativeTime(lastEventDate);
    } catch {
        return null;
    }
}

function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
}
