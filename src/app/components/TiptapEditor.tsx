import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder"; // Thêm extension Placeholder
import {
  LuBold,
  LuItalic,
  LuStrikethrough,
  LuList,
  LuListOrdered,
  LuUndo,
  LuRedo,
  LuImage as ImageIcon,
} from "react-icons/lu";
import { Button } from "@heroui/button";

interface TiptapEditorProps {
  content?: string; // Nội dung ban đầu
  placeholder?: string; // Placeholder mặc định
  attributes?: Record<string, string>;
  onChange?: (value: string) => void;
}

export default function TiptapEditor({
  content = "", // Nội dung ban đầu
  placeholder = "Nhập mô tả sản phẩm...", // Placeholder mặc định
  attributes = {
    class:
      "p-4 h-[70px] max-h-[100px] overflow-auto bg-gray-700 bg-opacity-20 text-normal text-sm border border-gray-600 border-opacity-10 rounded-lg focus:outline-none",
  },
  onChange,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "paragraph") {
            return placeholder;
          }
          return "";
        },
      }),
    ],
    content, // Gán nội dung ban đầu
    editorProps: {
      attributes,
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  // Cập nhật editor khi content thay đổi từ bên ngoài
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          editor?.chain().focus().setImage({ src: reader.result }).run();
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  if (!editor) return null;

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex gap-2 flex-1 bg-[#222] p-2 rounded-lg mb-2">
        <Button
          variant="flat"
          size="sm"
          onPress={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-gray-700" : ""}
        >
          <LuBold size={16} />
        </Button>
        <Button
          variant="flat"
          size="sm"
          onPress={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-gray-700" : ""}
        >
          <LuItalic size={16} />
        </Button>
        <Button
          variant="flat"
          size="sm"
          onPress={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-gray-700" : ""}
        >
          <LuStrikethrough size={16} />
        </Button>
        <Button
          variant="flat"
          size="sm"
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-gray-700" : ""}
        >
          <LuList size={16} />
        </Button>
        <Button
          variant="flat"
          size="sm"
          onPress={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-gray-700" : ""}
        >
          <LuListOrdered size={16} />
        </Button>
        <Button variant="flat" size="sm" onPress={handleImageUpload}>
          <ImageIcon size={16} />
        </Button>
        <Button
          variant="flat"
          size="sm"
          onPress={() => editor.chain().focus().undo().run()}
        >
          <LuUndo size={16} />
        </Button>
        <Button
          variant="flat"
          size="sm"
          onPress={() => editor.chain().focus().redo().run()}
        >
          <LuRedo size={16} />
        </Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
