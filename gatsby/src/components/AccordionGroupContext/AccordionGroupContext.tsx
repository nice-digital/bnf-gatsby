import { createContext, useContext, type FC } from "react";

export interface AccordionGroupContextType {
	isGroupOpen: boolean;
}

export const AccordionGroupContext = createContext<AccordionGroupContextType>({
	isGroupOpen: false,
});

export interface AccordionGroupProviderProps {
	isGroupOpen: boolean;
}

export const AccordionGroupProvider: FC<AccordionGroupProviderProps> = ({
	children,
	isGroupOpen,
}) => {
	return (
		<AccordionGroupContext.Provider value={{ isGroupOpen }}>
			{children}
		</AccordionGroupContext.Provider>
	);
};

export const useAccordionGroup = (): AccordionGroupContextType =>
	useContext(AccordionGroupContext);
