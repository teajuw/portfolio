import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border pt-10 flex gap-6 mt-20">
            <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono font-bold text-foreground hover:text-primary transition-colors"
            >
                <Github size={20} />
                GitHub
            </a>
            <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono font-bold text-foreground hover:text-primary transition-colors"
            >
                <Linkedin size={20} />
                LinkedIn
            </a>
            <a
                href="mailto:hello@example.com"
                className="flex items-center gap-2 font-mono font-bold text-primary hover:text-primary/80 transition-colors"
            >
                <Mail size={20} />
                Email
            </a>
        </footer>
    );
}
