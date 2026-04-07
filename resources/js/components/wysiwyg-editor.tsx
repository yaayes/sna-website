import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    ChevronDown,
    Heading2,
    Heading3,
    Highlighter,
    ImageIcon,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Loader2,
    Paintbrush,
    Pilcrow,
    Quote,
    Redo,
    RemoveFormatting,
    Smile,
    Strikethrough,
    Type,
    Underline as UnderlineIcon,
    Undo,
    Unlink,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { store as uploadWysiwygImage } from '@/actions/App/Http/Controllers/Admin/ImageUploadController';

import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type WysiwygEditorProps = {
    value: string;
    onChange: (value: string) => void;
    minHeightClassName?: string;
};

const TEXT_COLORS = [
    { label: 'Noir', value: '#1f2937' },
    { label: 'Gris', value: '#6b7280' },
    { label: 'Rouge', value: '#dc2626' },
    { label: 'Orange', value: '#ea580c' },
    { label: 'Ambre', value: '#d97706' },
    { label: 'Vert', value: '#16a34a' },
    { label: 'Bleu', value: '#2563eb' },
    { label: 'Violet', value: '#7c3aed' },
    { label: 'Rose', value: '#db2777' },
];

const HIGHLIGHT_COLORS = [
    { label: 'Jaune', value: '#fef08a' },
    { label: 'Vert', value: '#bbf7d0' },
    { label: 'Bleu', value: '#bfdbfe' },
    { label: 'Rose', value: '#fbcfe8' },
    { label: 'Violet', value: '#e9d5ff' },
    { label: 'Orange', value: '#fed7aa' },
];

export default function WysiwygEditor({ value, onChange, minHeightClassName = 'min-h-52' }: WysiwygEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);

    // Always hold the latest onChange to avoid stale closures in editor event listeners.
    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
                blockquote: {},
                bulletList: {},
                orderedList: {},
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: { rel: 'noopener noreferrer nofollow', target: '_blank' },
            }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            Image.configure({ inline: false, allowBase64: false }),
            TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
            Placeholder.configure({ placeholder: 'Decrivez ici cette action du SNA...' }),
            Typography,
            CharacterCount,
        ],
        content: value || '<p></p>',
        editorProps: {
            attributes: {
                class: 'wysiwyg-content outline-none',
            },
        },
    });

    // Single update listener: marks the change as internal and propagates HTML to the parent.
    const isInternalUpdate = useRef(false);
    useEffect(() => {
        if (!editor || editor.isDestroyed) {
            return;
        }
        const handler = () => {
            isInternalUpdate.current = true;
            onChangeRef.current(editor.getHTML());
        };
        editor.on('update', handler);
        return () => {
            editor.off('update', handler);
        };
    }, [editor]);

    // Sync external value changes (e.g. form reset) back into the editor.
    useEffect(() => {
        if (!editor || editor.isDestroyed) {
            return;
        }
        if (isInternalUpdate.current) {
            isInternalUpdate.current = false;
            return;
        }
        const currentHtml = editor.getHTML();
        if (value !== currentHtml) {
            editor.commands.setContent(value || '<p></p>', { emitUpdate: false });
        }
    }, [value, editor]);

    const wordCount = editor?.storage.characterCount?.words() ?? 0;

    if (!editor) {
        return (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className={cn('flex items-center justify-center bg-white text-sm text-gray-500', minHeightClassName)}>
                    Chargement de l&apos;editeur...
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm" ref={editorRef}>
            <Toolbar editor={editor} />

            <BubbleMenu editor={editor} className="bubble-menu">
                <BubbleToolbar editor={editor} />
            </BubbleMenu>

            <div className={cn('cursor-text px-1', minHeightClassName)} onClick={() => editor.chain().focus().run()}>
                <EditorContent editor={editor} className="h-full" />
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-3 py-2 text-[11px] text-gray-500">
                <span>Collage riche preserve · Emojis disponibles dans la barre d&apos;outils</span>
                <span>{wordCount} mots</span>
            </div>
        </div>
    );
}

// ─── Toolbar ──────────────────────────────────────────

type ToolbarProps = {
    editor: NonNullable<ReturnType<typeof useEditor>>;
};

function ToolbarButton({
    tooltip,
    pressed,
    onClick,
    disabled,
    children,
    className,
}: {
    tooltip: string;
    pressed?: boolean;
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Toggle size="sm" pressed={pressed} onPressedChange={() => onClick()} disabled={disabled} className={cn('h-8 w-8 p-0', className)}>
                    {children}
                </Toggle>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tooltip}</TooltipContent>
        </Tooltip>
    );
}

function Toolbar({ editor }: ToolbarProps) {
    return (
        <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-100 bg-gray-50/80 px-2 py-1.5">
            {/* Undo / Redo */}
            <ToolbarButton tooltip="Annuler (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                <Undo className="size-4" />
            </ToolbarButton>
            <ToolbarButton tooltip="Retablir (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                <Redo className="size-4" />
            </ToolbarButton>

            <ToolbarSeparator />

            {/* Block type */}
            <BlockTypeDropdown editor={editor} />

            <ToolbarSeparator />

            {/* Inline formatting */}
            <ToolbarButton tooltip="Gras (Ctrl+B)" pressed={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
                <Bold className="size-4" />
            </ToolbarButton>
            <ToolbarButton tooltip="Italique (Ctrl+I)" pressed={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
                <Italic className="size-4" />
            </ToolbarButton>
            <ToolbarButton
                tooltip="Souligner (Ctrl+U)"
                pressed={editor.isActive('underline')}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                <UnderlineIcon className="size-4" />
            </ToolbarButton>
            <ToolbarButton
                tooltip="Barre (Ctrl+Shift+S)"
                pressed={editor.isActive('strike')}
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className="size-4" />
            </ToolbarButton>

            <ToolbarSeparator />

            {/* Text color */}
            <ColorPicker editor={editor} type="text" />
            <ColorPicker editor={editor} type="highlight" />
            <ToolbarButton tooltip="Supprimer le formatage" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
                <RemoveFormatting className="size-4" />
            </ToolbarButton>

            <ToolbarSeparator />

            {/* Alignment */}
            <ToolbarButton
                tooltip="Aligner a gauche"
                pressed={editor.isActive({ textAlign: 'left' })}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
            >
                <AlignLeft className="size-4" />
            </ToolbarButton>
            <ToolbarButton
                tooltip="Centrer"
                pressed={editor.isActive({ textAlign: 'center' })}
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
            >
                <AlignCenter className="size-4" />
            </ToolbarButton>
            <ToolbarButton
                tooltip="Aligner a droite"
                pressed={editor.isActive({ textAlign: 'right' })}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
            >
                <AlignRight className="size-4" />
            </ToolbarButton>
            <ToolbarButton
                tooltip="Justifier"
                pressed={editor.isActive({ textAlign: 'justify' })}
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            >
                <AlignJustify className="size-4" />
            </ToolbarButton>

            <ToolbarSeparator />

            {/* Lists */}
            <ToolbarButton
                tooltip="Liste a puces"
                pressed={editor.isActive('bulletList')}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="size-4" />
            </ToolbarButton>
            <ToolbarButton
                tooltip="Liste numerotee"
                pressed={editor.isActive('orderedList')}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="size-4" />
            </ToolbarButton>
            <ToolbarButton
                tooltip="Citation"
                pressed={editor.isActive('blockquote')}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <Quote className="size-4" />
            </ToolbarButton>

            <ToolbarSeparator />

            {/* Link */}
            <LinkButton editor={editor} />

            {/* Image upload */}
            <ImageUploadButton editor={editor} />

            {/* Emoji picker */}
            <EmojiPicker editor={editor} />
        </div>
    );
}

// ─── Image Upload Button ──────────────────────────────

function ImageUploadButton({ editor }: ToolbarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) {
                return;
            }

            const formData = new FormData();
            formData.append('image', file);

            setIsUploading(true);
            try {
                const response = await fetch(uploadWysiwygImage.url(), {
                    method: 'POST',
                    credentials: 'same-origin',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Upload failed');
                }

                const data = (await response.json()) as { url: string };
                editor.chain().focus().setImage({ src: data.url }).run();
            } catch {
                // silently fail — the editor remains unchanged
            } finally {
                setIsUploading(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        },
        [editor],
    );

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="hidden"
                onChange={handleFileChange}
            />
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        type="button"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-muted disabled:opacity-50"
                    >
                        {isUploading ? <Loader2 className="size-4 animate-spin" /> : <ImageIcon className="size-4" />}
                    </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Inserer une image</TooltipContent>
            </Tooltip>
        </>
    );
}

function ToolbarSeparator() {
    return <Separator orientation="vertical" className="mx-1 h-6" />;
}

// ─── Block Type Dropdown ─────────────────────────────

const BLOCK_TYPES = [
    { label: 'Paragraphe', value: 'paragraph', icon: Type },
    { label: 'Titre H2', value: 'h2', icon: Type },
    { label: 'Titre H3', value: 'h3', icon: Type },
    { label: 'Citation', value: 'blockquote', icon: Quote },
] as const;

function BlockTypeDropdown({ editor }: ToolbarProps) {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);

    const activeBlock = editor.isActive('heading', { level: 2 })
        ? 'h2'
        : editor.isActive('heading', { level: 3 })
          ? 'h3'
          : editor.isActive('blockquote')
            ? 'blockquote'
            : 'paragraph';

    const activeLabel = BLOCK_TYPES.find((b) => b.value === activeBlock)?.label ?? 'Paragraphe';

    const setBlockType = useCallback(
        (type: string) => {
            const chain = editor.chain().focus();
            if (type === 'h2') {
                chain.toggleHeading({ level: 2 }).run();
            } else if (type === 'h3') {
                chain.toggleHeading({ level: 3 }).run();
            } else if (type === 'blockquote') {
                chain.toggleBlockquote().run();
            } else {
                chain.setParagraph().run();
            }
            setOpen(false);
        },
        [editor],
    );

    return (
        <div className="relative">
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        ref={btnRef}
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs font-medium text-gray-700 hover:bg-muted"
                    >
                        {activeLabel}
                        <ChevronDown className="size-3 opacity-60" />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Type de bloc</TooltipContent>
            </Tooltip>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-full z-50 mt-1 min-w-[160px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                        {BLOCK_TYPES.map((block) => (
                            <button
                                key={block.value}
                                type="button"
                                onClick={() => setBlockType(block.value)}
                                className={cn(
                                    'flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-gray-50',
                                    activeBlock === block.value && 'bg-gray-100 font-medium',
                                )}
                            >
                                <block.icon className="size-3.5 opacity-50" />
                                <span className={cn(block.value === 'h2' && 'text-base font-bold', block.value === 'h3' && 'text-sm font-semibold')}>
                                    {block.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

// ─── Color Picker ────────────────────────────────────

function ColorPicker({ editor, type }: ToolbarProps & { type: 'text' | 'highlight' }) {
    const [open, setOpen] = useState(false);
    const colors = type === 'text' ? TEXT_COLORS : HIGHLIGHT_COLORS;
    const isHighlight = type === 'highlight';

    const currentColor = isHighlight
        ? (editor.getAttributes('highlight').color as string | undefined)
        : (editor.getAttributes('textStyle').color as string | undefined);

    return (
        <div className="relative">
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
                    >
                        {isHighlight ? (
                            <Highlighter className="size-4" style={currentColor ? { color: currentColor } : undefined} />
                        ) : (
                            <Paintbrush className="size-4" style={currentColor ? { color: currentColor } : undefined} />
                        )}
                    </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{isHighlight ? 'Surlignage' : 'Couleur du texte'}</TooltipContent>
            </Tooltip>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                        <div className="grid grid-cols-3 gap-1">
                            {colors.map((c) => (
                                <button
                                    key={c.value}
                                    type="button"
                                    title={c.label}
                                    onClick={() => {
                                        if (isHighlight) {
                                            if (currentColor === c.value) {
                                                editor.chain().focus().unsetHighlight().run();
                                            } else {
                                                editor.chain().focus().setHighlight({ color: c.value }).run();
                                            }
                                        } else {
                                            if (currentColor === c.value) {
                                                editor.chain().focus().unsetColor().run();
                                            } else {
                                                editor.chain().focus().setColor(c.value).run();
                                            }
                                        }
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        'flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 transition-transform hover:scale-110',
                                        currentColor === c.value && 'ring-2 ring-gray-900 ring-offset-1',
                                    )}
                                    style={isHighlight ? { backgroundColor: c.value } : { color: c.value }}
                                >
                                    {!isHighlight && <span className="text-sm font-bold">A</span>}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                if (isHighlight) {
                                    editor.chain().focus().unsetHighlight().run();
                                } else {
                                    editor.chain().focus().unsetColor().run();
                                }
                                setOpen(false);
                            }}
                            className="mt-1.5 w-full rounded-md px-2 py-1 text-center text-xs text-gray-500 hover:bg-gray-50"
                        >
                            Supprimer
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

// ─── Link Button ─────────────────────────────────────

function LinkButton({ editor }: ToolbarProps) {
    const [showInput, setShowInput] = useState(false);
    const [url, setUrl] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const isActive = editor.isActive('link');

    const openLinkInput = useCallback(() => {
        const existingHref = editor.getAttributes('link').href as string | undefined;
        setUrl(existingHref ?? '');
        setShowInput(true);
        setTimeout(() => inputRef.current?.focus(), 50);
    }, [editor]);

    const applyLink = useCallback(() => {
        const trimmed = url.trim();
        if (trimmed === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
        } else {
            const href = /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
            editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
        }
        setShowInput(false);
        setUrl('');
    }, [editor, url]);

    if (isActive) {
        return (
            <ToolbarButton tooltip="Supprimer le lien" pressed onClick={() => editor.chain().focus().unsetLink().run()}>
                <Unlink className="size-4" />
            </ToolbarButton>
        );
    }

    return (
        <div className="relative">
            <ToolbarButton tooltip="Inserer un lien (Ctrl+K)" onClick={openLinkInput}>
                <LinkIcon className="size-4" />
            </ToolbarButton>

            {showInput && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowInput(false)} />
                    <div className="absolute left-0 top-full z-50 mt-1 flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                        <input
                            ref={inputRef}
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    applyLink();
                                }
                                if (e.key === 'Escape') {
                                    setShowInput(false);
                                }
                            }}
                            placeholder="https://exemple.fr"
                            className="h-8 w-56 rounded-md border border-gray-200 px-2 text-sm outline-none focus:border-gray-400"
                        />
                        <button
                            type="button"
                            onClick={applyLink}
                            className="h-8 rounded-md bg-gray-900 px-3 text-xs font-medium text-white hover:bg-gray-800"
                        >
                            OK
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

// ─── Bubble Menu (selection toolbar) ─────────────────

function BubbleToolbar({ editor }: ToolbarProps) {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const linkInputRef = useRef<HTMLInputElement>(null);

    const openLink = useCallback(() => {
        const existingHref = editor.getAttributes('link').href as string | undefined;
        setLinkUrl(existingHref ?? '');
        setShowLinkInput(true);
        setTimeout(() => linkInputRef.current?.focus(), 50);
    }, [editor]);

    const applyBubbleLink = useCallback(() => {
        const trimmed = linkUrl.trim();
        if (trimmed === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
        } else {
            const href = /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
            editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
        }
        setShowLinkInput(false);
        setLinkUrl('');
    }, [editor, linkUrl]);

    if (showLinkInput) {
        return (
            <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white p-1.5 shadow-xl">
                <input
                    ref={linkInputRef}
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            applyBubbleLink();
                        }
                        if (e.key === 'Escape') {
                            setShowLinkInput(false);
                        }
                    }}
                    placeholder="https://..."
                    className="h-7 w-48 rounded border border-gray-200 px-2 text-xs outline-none focus:border-gray-400"
                />
                <button type="button" onClick={applyBubbleLink} className="h-7 rounded bg-gray-900 px-2.5 text-xs font-medium text-white hover:bg-gray-800">
                    OK
                </button>
                <button type="button" onClick={() => setShowLinkInput(false)} className="h-7 rounded px-1.5 text-xs text-gray-500 hover:bg-gray-100">
                    ✕
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-xl">
            {/* Block type */}
            <BubbleBtn
                active={editor.isActive('paragraph') && !editor.isActive('heading')}
                onClick={() => editor.chain().focus().setParagraph().run()}
                title="Paragraphe"
            >
                <Pilcrow className="size-3.5" />
            </BubbleBtn>
            <BubbleBtn
                active={editor.isActive('heading', { level: 2 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                title="Titre H2"
            >
                <Heading2 className="size-3.5" />
            </BubbleBtn>
            <BubbleBtn
                active={editor.isActive('heading', { level: 3 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                title="Titre H3"
            >
                <Heading3 className="size-3.5" />
            </BubbleBtn>

            <Separator orientation="vertical" className="mx-0.5 h-5" />

            {/* Inline formatting */}
            <BubbleBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Gras">
                <Bold className="size-3.5" />
            </BubbleBtn>
            <BubbleBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italique">
                <Italic className="size-3.5" />
            </BubbleBtn>
            <BubbleBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Souligner">
                <UnderlineIcon className="size-3.5" />
            </BubbleBtn>
            <BubbleBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Barre">
                <Strikethrough className="size-3.5" />
            </BubbleBtn>

            <Separator orientation="vertical" className="mx-0.5 h-5" />

            <BubbleBtn active={editor.isActive('link')} onClick={editor.isActive('link') ? () => editor.chain().focus().unsetLink().run() : openLink} title="Lien">
                {editor.isActive('link') ? <Unlink className="size-3.5" /> : <LinkIcon className="size-3.5" />}
            </BubbleBtn>
        </div>
    );
}

function BubbleBtn({ active, onClick, children, title }: { active?: boolean; onClick: () => void; children: React.ReactNode; title?: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={cn('flex h-7 w-7 items-center justify-center rounded-md transition-colors', active ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100')}
        >
            {children}
        </button>
    );
}

// ─── Emoji Picker ────────────────────────────────────

const EMOJI_CATEGORIES: { label: string; emojis: string[] }[] = [
    {
        label: 'Visages',
        emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🥰', '😍', '🤩', '😘', '😜', '🤔', '🤗', '😢', '😭', '😤', '😡', '🥺', '😱', '😴', '🤮', '🤧', '😷', '🤠', '🥳', '😎', '🤓'],
    },
    {
        label: 'Gestes',
        emojis: ['👍', '👎', '👏', '🙌', '🤝', '💪', '✌️', '🤞', '👋', '✋', '🖐️', '👆', '👇', '👈', '👉', '☝️', '🫶', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '💯', '⭐', '🌟', '✨', '🔥'],
    },
    {
        label: 'Objets',
        emojis: ['📌', '📎', '✏️', '📝', '📅', '📊', '📈', '✅', '❌', '⚠️', '💡', '🔔', '📢', '🎯', '🏆', '🎉', '🎊', '🎁', '📱', '💻', '🏠', '🏥', '🚗', '🚑', '♿', '🦽', '🧑‍🦯', '👨‍👩‍👧', '🤱', '👶'],
    },
    {
        label: 'Nature',
        emojis: ['🌍', '🌱', '🌳', '🌻', '🌈', '☀️', '🌙', '⛅', '🍀', '🌺', '🦋', '🐾', '🐶', '🐱', '🕊️', '🐝', '🦉', '🍎', '🍕', '☕', '🧃', '💧', '🌊', '⛰️', '🏖️', '🎵', '🎶', '📚', '🎨', '🧩'],
    },
];

function EmojiPicker({ editor }: ToolbarProps) {
    const [open, setOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(0);

    const insertEmoji = useCallback(
        (emoji: string) => {
            editor.chain().focus().insertContent(emoji).run();
            setOpen(false);
        },
        [editor],
    );

    return (
        <div className="relative">
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-muted"
                    >
                        <Smile className="size-4" />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Emoji</TooltipContent>
            </Tooltip>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-full z-50 mt-1 w-[300px] rounded-lg border border-gray-200 bg-white shadow-lg">
                        {/* Category tabs */}
                        <div className="flex border-b border-gray-100">
                            {EMOJI_CATEGORIES.map((cat, idx) => (
                                <button
                                    key={cat.label}
                                    type="button"
                                    onClick={() => setActiveCategory(idx)}
                                    className={cn(
                                        'flex-1 px-1 py-1.5 text-[11px] font-medium transition-colors',
                                        activeCategory === idx ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-400 hover:text-gray-600',
                                    )}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Emoji grid */}
                        <div className="grid max-h-[200px] grid-cols-10 gap-0.5 overflow-y-auto p-1.5">
                            {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji) => (
                                <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => insertEmoji(emoji)}
                                    className="flex h-7 w-7 items-center justify-center rounded-md text-base transition-transform hover:scale-125 hover:bg-gray-100"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
