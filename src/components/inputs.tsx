import {type ChangeEvent, useState} from "react";
import type {Tag} from 'react-tag-input'
import {WithContext as ReactTags, SEPARATORS} from 'react-tag-input';

export function TextInput({name, label, value, placeholderValue, onChange, isRequired}: {
    name: string,
    label: string,
    value: string,
    placeholderValue: string,
    onChange?: (e: ChangeEvent) => void,
    isRequired?: boolean
}) {
    return (
        <label className={"flex flex-col gap-2"}>
            {label}
            <input className={`rounded-lg bg-transparent border-2 border-white p-2`} required={isRequired} type={"text"}
                   name={name} value={value} onChange={onChange} placeholder={placeholderValue}/>
        </label>
    )
}

export function NumberInput({name, label, value, onChange, isRequired, minValue = 0, stepValue = 0.01}: {
    name: string,
    label: string,
    value: number,
    onChange?: (e: ChangeEvent) => void,
    isRequired?: boolean,
    minValue?: number,
    stepValue?: number,
}) {
    return (
        <label className={"flex flex-col gap-2"}>
            {label}
            <input className={`rounded-lg bg-transparent border-2 border-white p-2`} required={isRequired}
                   type={"number"}
                   name={name} value={value} onChange={onChange} min={minValue} step={stepValue}/>
        </label>
    )
}

export function SelectInput({name, label, value, options, onChange, isRequired}: {
    name: string;
    label: string;
    value: string;
    options: string[];
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    isRequired?: boolean;
}) {
    return (
        <label className="flex flex-col gap-2">
            {label}
            <select
                className="rounded-lg border-2 border-white p-2"
                name={name}
                value={value}
                onChange={onChange}
                required={isRequired}
            >
                <option className={"cursor-pointer bg-gray-800"} value="" disabled>
                    Select {label.toLowerCase()}
                </option>
                {options.map((town) => (
                    <option className={"bg-gray-800"} key={town} value={town}>
                        {town}
                    </option>
                ))}
            </select>
        </label>
    );
}

export function TagInput({name, label, currentTags, tagSuggestions, onChange, className = ""}: {
    name: string;
    label: string;
    currentTags: string[];
    tagSuggestions: Tag[];
    onChange: (tags: string[]) => void;
    className?: string;
}) {
    const [tags, setTags] = useState<Tag[]>(
        currentTags.map((tag: string) => ({id: tag, text: tag, className: ""}))
    );

    const handleDelete = (i: number) => {
        const newTags = tags.filter((_, index) => index !== i);
        setTags(newTags);
        onChange(newTags.map((t) => t.text));
    };

    const handleAddition = (tag: Tag) => {
        const newTags = [...tags, tag];
        setTags(newTags);
        onChange(newTags.map((t) => t.text));
    };

    const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
        const newTags = [...tags];
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
        onChange(newTags.map((t) => t.text));
    };

    return (
        <label className={`flex flex-col gap-2 ${className}`}>
            <span className="text-white">{label}</span>
            <ReactTags
                name={name}
                tags={tags}
                suggestions={tagSuggestions}
                separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                inputFieldPosition="top"
                editable
                minQueryLength={1}
                classNames={{
                    tagInput: "rounded-lg bg-transparent border-2 border-white p-2 mb-2",
                    tagInputField: "bg-transparent outline-none text-white",
                    tag: "bg-slate-900 text-white rounded-lg px-2 py-1 flex flex-row gap-2",
                    selected: "flex flex-wrap gap-3",
                    suggestions: "absolute w-50 flex flex-col gap-2 bg-gray-800 rounded-lg border-2 border-white [&>ul>li]:px-2 [&>ul>li]:py-1",
                    activeSuggestion: "bg-blue-400 rounded-lg shadow-md",
                }}
            />
        </label>
    );
}