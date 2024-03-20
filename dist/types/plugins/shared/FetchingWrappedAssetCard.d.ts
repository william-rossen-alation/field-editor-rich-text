import { FieldAppSDK } from '@contentful/app-sdk';
interface FetchingWrappedAssetCardProps {
    assetId: string;
    isDisabled: boolean;
    isSelected: boolean;
    locale: string;
    onEdit?: () => void;
    onRemove?: () => unknown;
    sdk: FieldAppSDK;
    onEntityFetchComplete?: VoidFunction;
}
export declare function FetchingWrappedAssetCard(props: FetchingWrappedAssetCardProps): JSX.Element;
export {};
