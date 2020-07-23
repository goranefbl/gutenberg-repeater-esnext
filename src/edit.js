import produce from "immer";
import { __ } from "@wordpress/i18n";
import "./editor.scss";

import { RichText, PlainText } from "@wordpress/block-editor";
// import { useState } from "@wordpress/element";

export default function Edit({ attributes, setAttributes, className }) {
	const services = attributes.services;

	const onChangeContent = (content, index, type) => {
		const newContent = produce(services, (draftState) => {
			draftState.forEach((section) => {
				if (section.index === index) {
					section[type] = content;
				}
			});
		});
		setAttributes({ services: newContent });
	};
	return (
		<>
			{services.map((service) => (
				<>
					<RichText
						tagName="h3"
						className={className}
						value={service.headline}
						onChange={(content) =>
							onChangeContent(content, service.index, "headline")
						}
					/>
					<PlainText
						className={className}
						value={service.description}
						onChange={(content) =>
							onChangeContent(content, service.index, "description")
						}
					/>
				</>
			))}
			<input
				className="button button-secondary"
				type="button"
				value={__("Add Service", "am2-gutenberg")}
				onClick={() =>
					setAttributes({
						services: [
							...attributes.services,
							{ headline: "", description: "", index: services.length },
						],
					})
				}
			/>
		</>
	);
}
