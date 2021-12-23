import type { FeedSimpleRecord, FeedRecordSection } from "../downloader/types";
import type { SourceNodesArgs, NodeInput } from "gatsby";
import type { Except } from "type-fest";

export const aboutSectionNodeType = "BnfAboutSection";

export interface AboutSectionNode
	extends NodeInput,
		Except<FeedSimpleRecord, "id" | "sections"> {
	order: number;
	bnfId: string;
	sections: ({ order: number } & FeedRecordSection)[];
	// Internal Gatsby node stuff
	internal: {
		type: typeof aboutSectionNodeType;
	} & NodeInput["internal"];
}

export const createAboutSectionNodes = (
	aboutSections: FeedSimpleRecord[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	const { createNodeId, createContentDigest, actions } = sourceNodesArgs;
	const { createNode } = actions;

	aboutSections.forEach(({ id, title, reviewDate, sections }, order) => {
		const nodeContent = {
			order,
			bnfId: id,
			title,
			reviewDate,
			sections: sections.map(({ title, ...props }, order) => ({
				title,
				order,
				...props,
			})),
		};

		const aboutSectionNode: AboutSectionNode = {
			...nodeContent,
			id: createNodeId(id),
			children: [],
			internal: {
				type: aboutSectionNodeType,
				content: JSON.stringify(nodeContent),
				contentDigest: createContentDigest(nodeContent),
			},
		};

		createNode(aboutSectionNode);
	});
};
