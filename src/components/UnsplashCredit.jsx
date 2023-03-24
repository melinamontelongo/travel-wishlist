export const UnsplashCredit = ({ photographer }) => {
    return (
        <p className="text-zinc-500 text-md font-['Cutive_Mono']">Photo by <a className="underline" href={`https://unsplash.com/@${photographer}?utm_source=eTimer&utm_medium=referral`}>{photographer}</a> on <a className="underline" href="https://unsplash.com/?utm_source=travel-wishlist&utm_medium=referral">Unsplash</a></p>
    )
};