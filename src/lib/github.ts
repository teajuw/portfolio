const GITHUB_USERNAME = "teajuw";

interface GitHubEvent {
    type: string;
    repo: { name: string };
    created_at: string;
    payload: {
        ref?: string;
        ref_type?: string;
    };
}

function getRelativeTime(date: Date): string {
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

function formatEvent(event: GitHubEvent): string {
    const repo = event.repo.name.replace(`${GITHUB_USERNAME}/`, "");
    const time = getRelativeTime(new Date(event.created_at));

    switch (event.type) {
        case "PushEvent":
            return `pushed to ${repo} ${time}`;
        case "CreateEvent":
            if (event.payload.ref_type === "branch") {
                return `created branch on ${repo} ${time}`;
            }
            return `created ${repo} ${time}`;
        case "PullRequestEvent":
            return `opened PR on ${repo} ${time}`;
        case "IssuesEvent":
            return `opened issue on ${repo} ${time}`;
        default:
            return `active on ${repo} ${time}`;
    }
}

export async function getGitHubActivity(): Promise<string> {
    try {
        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=10`,
            { next: { revalidate: 300 } }
        );

        if (!res.ok) {
            return "building things";
        }

        const events: GitHubEvent[] = await res.json();

        if (events.length === 0) {
            return "building things";
        }

        return formatEvent(events[0]);
    } catch {
        return "building things";
    }
}
