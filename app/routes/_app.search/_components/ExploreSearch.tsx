import { ExploreItem } from '~/types';
import ExploreSearchItem from './ExploreSearchItem';

interface ExploreSearchProps {
    title: string;
    exploreItems: ExploreItem[];
    gapFromTop?: boolean; // Optional prop, default can be handled via Tailwind
}

const ExploreSearch: React.FC<ExploreSearchProps> = ({ title, exploreItems, gapFromTop = false }) => {
    return (
        <div className={`${gapFromTop ? "mt-10" : ""}`}>
            <h1 className="text-lg font-bold mb-4">{title}</h1>
        
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {exploreItems.map((item) => (
                    <ExploreSearchItem item={item} index={item.title}/>
                ))}
            </div>
        </div>
    )
}

export default ExploreSearch