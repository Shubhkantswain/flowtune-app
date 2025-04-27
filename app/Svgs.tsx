type IconProps = {
    width?: string
    height?: string
}

const HomeIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_navigation_home" d="M21.343,8.661 L13.448,1.556 C12.625,0.815 11.375,0.815 10.552,1.556 L2.657,8.661 C2.238,9.039 2,9.564 2,10.113 L2,20 C2,21.105 2.943,22 4.105,22 L9,22 L9,13 L15,13 L15,22 L19.895,22 C21.057,22 22,21.105 22,20 L22,10.113 C22,9.564 21.762,9.039 21.343,8.661 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_navigation_home" fill="currentColor"></use></g></svg>
)

const ExploreIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-compass-icon lucide-compass"><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /><circle cx="12" cy="12" r="10" /></svg>
)

const LibraryIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 28 28"><defs><path id="library_heartfilled" fillRule="nonzero" d="M5.86159 6.91042C5.6 7.42381 5.6 8.09588 5.6 9.44V22.16C5.6 23.5041 5.6 24.1762 5.86159 24.6896C6.09168 25.1412 6.45883 25.5084 6.91042 25.7384C7.42381 26 8.09588 26 9.44 26H22.16C23.5041 26 24.1762 26 24.6896 25.7384C25.1412 25.5084 25.5084 25.1412 25.7384 24.6896C26 24.1762 26 23.5041 26 22.16V9.44C26 8.09588 26 7.42381 25.7384 6.91042C25.5084 6.45883 25.1412 6.09168 24.6896 5.86159C24.1762 5.6 23.5041 5.6 22.16 5.6H9.44C8.09588 5.6 7.42381 5.6 6.91042 5.86159C6.45883 6.09168 6.09168 6.45883 5.86159 6.91042ZM15.8 13.1037C16.4812 11.0848 17.3774 10.414 18.9549 10.414C20.5323 10.414 22.1097 11.4233 22.1097 14.0004C22.1097 16.9904 18.635 19.3545 16.6814 20.6838C16.4734 20.8254 16.2826 20.9551 16.1152 21.0727C16.0198 21.1396 15.9096 21.1731 15.8 21.1731C15.6904 21.1731 15.5803 21.1396 15.4849 21.0727C15.3177 20.9553 15.1274 20.8258 14.9198 20.6847C12.9662 19.3557 9.49029 16.9911 9.49029 14.0004C9.49029 11.4233 11.0677 10.414 12.6452 10.414C14.2226 10.414 15.1059 11.0636 15.8 13.1037Z" /> <path id="library_heartfilled-1" fillRule="nonzero" d="M2.26159 3.31042C2 3.82381 2 4.49588 2 5.84V18.56C2 19.9041 2 20.5762 2.26159 21.0896C2.49168 21.5412 2.85883 21.9084 3.31042 22.1384C3.47037 22.2199 3.64572 22.276 3.85198 22.3147V7.45198C3.85198 5.46376 5.46376 3.85198 7.45198 3.85198H22.3147C22.276 3.64572 22.2199 3.47037 22.1384 3.31042C21.9084 2.85883 21.5412 2.49168 21.0896 2.26159C20.5762 2 19.9041 2 18.56 2H5.84C4.49588 2 3.82381 2 3.31042 2.26159C2.85883 2.49168 2.49168 2.85883 2.26159 3.31042Z" /></defs><g fillRule="evenodd" fill="transparent"><rect width="28" height="28" /><use href="#library_heartfilled-1" fill="currentColor" /><use href="#library_heartfilled" fill="currentColor" /></g></svg>
)

const SearchIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_navigation_search" fill-rule="nonzero" d="M22.707,21.293 L17.025,15.611 C18.258,14.071 19,12.122 19,10 C19,5.038 14.963,1 10,1 C5.038,1 1,5.038 1,10 C1,14.963 5.038,19 10,19 C12.122,19 14.071,18.258 15.611,17.025 L21.293,22.707 C21.488,22.902 21.744,23 22,23 C22.256,23 22.512,22.902 22.707,22.707 C23.098,22.316 23.098,21.684 22.707,21.293 Z M10,17 C6.14,17 3,13.859 3,10 C3,6.14 6.14,3 10,3 C13.859,3 17,6.14 17,10 C17,13.859 13.859,17 10,17 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_navigation_search" fill="currentColor"></use></g></svg>
)

const AccountIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_navigation_profile-a" d="M7,6 C7,3.239 9.239,1 12,1 C14.761,1 17,3.239 17,6 C17,8.761 14.761,11 12,11 C9.239,11 7,8.761 7,6 Z M21.948,18.684 C20.868,15.443 17.015,12 12,12 C6.985,12 3.131,15.443 2.051,18.684 C1.931,19.043 2.025,19.44 2.293,19.707 C4.417,21.83 7.864,23 12,23 C16.137,23 19.584,21.83 21.707,19.707 C21.975,19.439 22.068,19.043 21.948,18.684 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_navigation_profile-a" fill="currentColor"></use></g></svg>
)

const CrossIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_action_cancel-a" d="M19.071,17.657 L13.414,12 L19.071,6.343 C19.461,5.953 19.461,5.319 19.071,4.929 C18.681,4.539 18.047,4.539 17.657,4.929 L12,10.586 L6.343,4.929 C5.953,4.539 5.319,4.539 4.929,4.929 C4.539,5.319 4.539,5.953 4.929,6.343 L10.586,12 L4.929,17.657 C4.538,18.048 4.539,18.681 4.929,19.071 C5.319,19.461 5.952,19.462 6.343,19.071 L12,13.414 L17.657,19.071 C18.047,19.461 18.681,19.461 19.071,19.071 C19.461,18.681 19.462,18.047 19.071,17.657 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_cancel-a" fill="currentColor"></use></g></svg>
)

const PlayIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_playback_play-a" d="M21.54933,11.208 L7.32711083,2.131 C7.05155533,1.955 6.7155554,1.957 6.44177768,2.136 C6.16799996,2.315 6,2.644 6,3 L6,21 C6,21.354 6.16711108,21.683 6.43911102,21.862 C6.57777765,21.954 6.73333318,22 6.8888887,22 C7.038222,22 7.18666641,21.958 7.32177749,21.873 L21.5439967,12.951 C21.8239966,12.775 21.9991077,12.442 22,12.081 C22.0008855,11.72 21.8293299,11.386 21.54933,11.208 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_playback_play-a" fill="currentColor"></use></g></svg>
)

const PauseIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use></g></svg>
)

const PlusIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
)

const MoreIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_action_more-a" d="M19,14 C17.895,14 17,13.105 17,12 C17,10.895 17.895,10 19,10 C20.105,10 21,10.895 21,12 C21,13.105 20.105,14 19,14 Z M14,12 C14,10.895 13.105,10 12,10 C10.895,10 10,10.895 10,12 C10,13.105 10.895,14 12,14 C13.105,14 14,13.105 14,12 Z M7,12 C7,10.895 6.105,10 5,10 C3.895,10 3,10.895 3,12 C3,13.105 3.895,14 5,14 C6.105,14 7,13.105 7,12 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_action_more-a" fill="currentColor"></use></g></svg>
)

const BadgeIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-check-icon lucide-badge-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg>
)

const HeartIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_action_favorite-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z M12,18.797 C9.077,16.832 4,13.186 4,9 C4,6.794 5.794,5 8,5 C9.263,5 10.429,5.592 11.198,6.625 C11.575,7.131 12.425,7.131 12.802,6.625 C13.571,5.592 14.737,5 16,5 C18.206,5 20,6.794 20,9 C20,13.186 14.923,16.832 12,18.797 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_action_favorite-a" fill="currentColor"></use></g></svg>

)
const HeartIconFilled = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_action_favoriteon-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_favoriteon-a" fill="currentColor"></use></g></svg>
)

const PrevIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_playback_previous-a" d="M18.462,4.113 C18.131,3.943 17.733,3.967 17.427,4.181 L9,10.079 L9,4 C9,3.45 8.55,3 8,3 L6,3 C5.45,3 5,3.45 5,4 L5,20 C5,20.55 5.45,21 6,21 L8,21 C8.55,21 9,20.55 9,20 L9,13.921 L17.427,19.82 C17.598,19.939 17.799,20 18,20 C18.158,20 18.316,19.963 18.462,19.887 C18.793,19.715 19,19.373 19,19 L19,5 C19,4.627 18.793,4.285 18.462,4.113 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_playback_previous-a" fill="currentColor"></use></g></svg>
)


const NextIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_playback_next-a" d="M18,3 L16,3 C15.45,3 15,3.45 15,4 L15,10.067 L6.57,4.182 C6.26,3.97 5.87,3.939 5.54,4.111 C5.21,4.293 5,4.636 5,5.009 L5,18.99 C5,19.363 5.21,19.707 5.54,19.878 C5.68,19.96 5.84,20 6,20 C6.2,20 6.4,19.939 6.57,19.818 L15,13.923 L15,20 C15,20.55 15.45,21 16,21 L18,21 C18.55,21 19,20.55 19,20 L19,4 C19,3.45 18.55,3 18,3 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_playback_next-a" fill="currentColor"></use></g></svg>
)

const TwoLineIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
        <path d="M6 9h12M6 15h12" />
    </svg>
)
const SkipBackwardIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24">
        <defs>
            <path id="ic_playback_jumpback15-a" d="M12,1 C9.447,1 7.051,1.865 5.124,3.417 L3.854,2.146 C3.724,2.016 3.534,1.967 3.355,2.021 C3.179,2.074 3.046,2.221 3.01,2.401 L2.01,7.401 C1.977,7.566 2.028,7.735 2.146,7.854 C2.241,7.948 2.369,8 2.5,8 C2.533,8 2.565,7.997 2.598,7.99 L7.598,6.99 C7.779,6.954 7.925,6.821 7.978,6.645 C8.031,6.468 7.983,6.277 7.853,6.146 L6.553,4.846 C8.099,3.662 9.988,3 12,3 C16.963,3 21,7.038 21,12 C21,16.963 16.963,21 12,21 C9.143,21 6.518,19.688 4.799,17.399 C4.467,16.958 3.841,16.869 3.399,17.2 C2.958,17.532 2.868,18.159 3.2,18.6 C5.3,21.396 8.507,23 12,23 C18.065,23 23,18.065 23,12 C23,5.935 18.065,1 12,1 Z M10.349,15 C10.4283333,15 10.4835833,14.983 10.51475,14.949 C10.5459167,14.915 10.5615,14.8611667 10.5615,14.7875 L10.5615,14.7875 L10.5615,9.322 C10.5615,9.24266667 10.5459167,9.18741667 10.51475,9.15625 C10.4835833,9.12508333 10.4283333,9.1095 10.349,9.1095 L10.349,9.1095 L9.6435,9.1095 C9.5075,9.1095 9.38,9.13783333 9.261,9.1945 L9.261,9.1945 L7.9775,9.781 C7.90383333,9.815 7.85425,9.85183333 7.82875,9.8915 C7.80325,9.93116667 7.7905,9.99066667 7.7905,10.07 L7.7905,10.07 L7.7905,10.631 C7.7905,10.7386667 7.83016667,10.7925 7.9095,10.7925 C7.94916667,10.7925 8.02566667,10.7726667 8.139,10.733 L8.139,10.733 L9.3035,10.3505 L9.3035,14.7875 C9.3035,14.8611667 9.3205,14.915 9.3545,14.949 C9.3885,14.983 9.44233333,15 9.516,15 L9.516,15 L10.349,15 Z M14.208,15.1275 C14.6443333,15.1275 15.0339167,15.0495833 15.37675,14.89375 C15.7195833,14.7379167 15.98875,14.5126667 16.18425,14.218 C16.37975,13.9233333 16.4775,13.5776667 16.4775,13.181 C16.4775,12.637 16.3018333,12.2020833 15.9505,11.87625 C15.5991667,11.5504167 15.1316667,11.3875 14.548,11.3875 C14.293,11.3875 14.0493333,11.4158333 13.817,11.4725 L13.817,11.4725 L13.9105,10.0785 L15.993,10.0785 C16.0723333,10.0785 16.1275833,10.0615 16.15875,10.0275 C16.1899167,9.9935 16.2055,9.93966667 16.2055,9.866 L16.2055,9.866 L16.2055,9.322 C16.2055,9.24266667 16.1899167,9.18741667 16.15875,9.15625 C16.1275833,9.12508333 16.0723333,9.1095 15.993,9.1095 L15.993,9.1095 L13.0775,9.1095 C13.0038333,9.1095 12.9485833,9.12791667 12.91175,9.16475 C12.8749167,9.20158333 12.8536667,9.25966667 12.848,9.339 L12.848,9.339 L12.712,11.634 L12.712,12.1695 C12.712,12.2431667 12.729,12.297 12.763,12.331 C12.797,12.365 12.8508333,12.382 12.9245,12.382 C12.9585,12.382 13.0024167,12.3791667 13.05625,12.3735 C13.1100833,12.3678333 13.188,12.3593333 13.29,12.348 C13.5733333,12.3253333 13.8453333,12.314 14.106,12.314 C14.4856667,12.314 14.7661667,12.38625 14.9475,12.53075 C15.1288333,12.67525 15.2195,12.9005 15.2195,13.2065 C15.2195,13.5125 15.1288333,13.7448333 14.9475,13.9035 C14.7661667,14.0621667 14.4998333,14.1415 14.1485,14.1415 C13.9501667,14.1415 13.7475833,14.1245 13.54075,14.0905 C13.3339167,14.0565 13.0746667,13.9941667 12.763,13.9035 C12.7176667,13.8921667 12.6850833,13.8836667 12.66525,13.878 C12.6454167,13.8723333 12.627,13.8695 12.61,13.8695 C12.5136667,13.8695 12.4655,13.9346667 12.4655,14.065 L12.4655,14.065 L12.4655,14.592 C12.4655,14.6656667 12.47825,14.7195 12.50375,14.7535 C12.52925,14.7875 12.5788333,14.8186667 12.6525,14.847 C13.1398333,15.034 13.6583333,15.1275 14.208,15.1275 Z"></path>
        </defs>
        <g fill-rule="evenodd" fill="transparent">
            <rect width="24" height="24"></rect>
            <use fill-rule="nonzero" href="#ic_playback_jumpback15-a" fill="currentColor"></use>
        </g>
    </svg>
)

const SkipForwardIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24">
        <defs>
            <path id="ic_playback_jumpforward30-a" d="M9.089,15.13 C8.858,15.13 8.614,15.105 8.357,15.056 C8.1,15.007 7.862,14.939 7.642,14.852 C7.567,14.823 7.517,14.79 7.49,14.752 C7.464,14.715 7.451,14.65 7.451,14.557 L7.451,14.045 C7.451,13.912 7.5,13.846 7.598,13.846 C7.615,13.846 7.634,13.849 7.655,13.855 C7.674,13.861 7.708,13.869 7.754,13.881 C8.326,14.043 8.757,14.124 9.046,14.124 C9.416,14.124 9.698,14.044 9.891,13.885 C10.085,13.726 10.181,13.494 10.181,13.187 C10.181,12.915 10.092,12.715 9.913,12.584 C9.734,12.454 9.457,12.389 9.081,12.389 C8.93,12.389 8.805,12.395 8.704,12.406 C8.602,12.418 8.517,12.423 8.447,12.423 C8.332,12.423 8.274,12.354 8.274,12.215 L8.274,11.903 C8.274,11.799 8.284,11.721 8.304,11.669 C8.323,11.617 8.366,11.556 8.429,11.487 L9.827,9.98 L7.746,9.98 C7.671,9.98 7.616,9.963 7.581,9.928 C7.547,9.893 7.529,9.839 7.529,9.763 L7.529,9.209 C7.529,9.128 7.547,9.072 7.581,9.04 C7.616,9.008 7.671,8.992 7.746,8.992 L10.971,8.992 C11.052,8.992 11.108,9.008 11.14,9.04 C11.171,9.072 11.187,9.128 11.187,9.209 L11.187,9.686 C11.187,9.79 11.177,9.868 11.157,9.92 C11.137,9.972 11.095,10.033 11.032,10.102 L9.662,11.498 C10.217,11.527 10.653,11.692 10.971,11.992 C11.289,12.293 11.448,12.689 11.448,13.18 C11.448,13.579 11.348,13.925 11.148,14.22 C10.949,14.515 10.671,14.74 10.316,14.896 C9.96,15.052 9.552,15.13 9.089,15.13 Z M14.542,15.13 C13.808,15.13 13.244,14.859 12.851,14.315 C12.458,13.772 12.262,12.994 12.262,11.983 C12.262,10.977 12.46,10.203 12.855,9.66 C13.251,9.117 13.813,8.845 14.541,8.845 C15.269,8.845 15.831,9.117 16.227,9.66 C16.622,10.204 16.82,10.978 16.82,11.983 C16.82,12.994 16.624,13.772 16.231,14.315 C15.84,14.858 15.276,15.13 14.542,15.13 Z M14.542,14.09 C14.894,14.09 15.146,13.928 15.296,13.604 C15.446,13.28 15.521,12.74 15.521,11.983 C15.521,11.232 15.446,10.694 15.296,10.371 C15.145,10.047 14.894,9.885 14.542,9.885 C14.19,9.885 13.938,10.047 13.788,10.371 C13.638,10.694 13.563,11.232 13.563,11.983 C13.563,12.74 13.638,13.28 13.788,13.604 C13.939,13.928 14.19,14.09 14.542,14.09 Z M20.99,2.402 C20.954,2.221 20.821,2.075 20.644,2.022 C20.471,1.968 20.276,2.016 20.146,2.147 L18.875,3.418 C16.948,1.865 14.553,1 12,1 C5.935,1 1,5.935 1,12 C1,18.065 5.935,23 12,23 C15.492,23 18.699,21.396 20.801,18.601 C21.132,18.16 21.043,17.533 20.602,17.201 C20.162,16.87 19.535,16.958 19.202,17.4 C17.481,19.688 14.857,21 12,21 C7.038,21 3,16.963 3,12 C3,7.038 7.038,3 12,3 C14.012,3 15.901,3.662 17.447,4.846 L16.147,6.146 C16.016,6.276 15.968,6.468 16.022,6.645 C16.076,6.821 16.221,6.954 16.403,6.99 L21.403,7.99 C21.435,7.997 21.468,8 21.5,8 C21.631,8 21.759,7.948 21.854,7.854 C21.972,7.736 22.024,7.566 21.991,7.402 L20.99,2.402 Z"></path>
        </defs>
        <g fill-rule="evenodd" fill="transparent">
            <rect width="24" height="24"></rect>
            <use fill-rule="nonzero" href="#ic_playback_jumpforward30-a" fill="currentColor"></use>
        </g>
    </svg>
)

const MuteIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24">
        <defs>
            <path id="ic_playback_volumeon-a" d="M14.447,2.106 C14.306,2.035 14.153,2 14,2 C13.787,2 13.576,2.068 13.4,2.2 L7,7 L3,7 C1.9,7 1,7.9 1,9 L1,15 C1,16.1 1.9,17 3,17 L7,17 L13.4,21.8 C13.576,21.932 13.788,22 14,22 C14.152,22 14.306,21.965 14.447,21.894 C14.786,21.725 15,21.379 15,21 L15,3 C15,2.621 14.786,2.275 14.447,2.106 Z"></path>
        </defs>
        <g fill-rule="evenodd" fill="transparent">
            <use href="#ic_playback_volumeon-a" fill="currentColor"></use>
        </g>
    </svg>
)

const VolumeIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24">
        <defs>
            <path id="ic_playback_volumeon-a" d="M14.447,2.106 C14.306,2.035 14.153,2 14,2 C13.787,2 13.576,2.068 13.4,2.2 L7,7 L3,7 C1.9,7 1,7.9 1,9 L1,15 C1,16.1 1.9,17 3,17 L7,17 L13.4,21.8 C13.576,21.932 13.788,22 14,22 C14.152,22 14.306,21.965 14.447,21.894 C14.786,21.725 15,21.379 15,21 L15,3 C15,2.621 14.786,2.275 14.447,2.106 Z"></path>
        </defs>
        <g fill-rule="evenodd" fill="transparent">
            <rect width="24" height="24"></rect>
            <path fill="#FFF" fill-rule="nonzero" d="M18.481,18.999 C18.481,18.775 18.556,18.549 18.711,18.363 C21.762,14.676 21.762,9.323 18.711,5.637 C18.359,5.212 18.419,4.581 18.844,4.229 C19.271,3.877 19.902,3.937 20.253,4.362 C23.915,8.786 23.916,15.211 20.253,19.636 C19.901,20.062 19.27,20.122 18.845,19.77 C18.605,19.573 18.481,19.287 18.481,18.999 Z M16.172,16.82 C16.626,17.135 17.25,17.025 17.567,16.572 C19.478,13.838 19.478,10.163 17.567,7.428 C17.25,6.975 16.626,6.864 16.172,7.18 C15.718,7.497 15.608,8.12 15.924,8.572 C17.357,10.623 17.358,13.377 15.924,15.427 C15.803,15.601 15.744,15.801 15.744,15.998 C15.743,16.314 15.893,16.626 16.172,16.82 Z" opacity=".5"></path>
            <use href="#ic_playback_volumeon-a" fill="currentColor"></use>
        </g>
    </svg>
)

const DiscIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-disc2-icon lucide-disc-2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><path d="M12 12h.01" /></svg>
)

const LoadingSpinnerIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg className="animate-spin" width={`${width}`} height={`${height}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
)

const UploadIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
)

const NonSelectIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg
        width={`${width}`} height={`${height}`}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            cx="10"
            cy="10"
            r="7.5"
            stroke="#71717a"
            strokeWidth="1"
            fill="none"
        />
    </svg>
)

const SelectedIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg
        width={`${width}`} height={`${height}`}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="10" cy="10" r="8" fill="#fa586a" />
        <circle cx="10" cy="10" r="4" fill="white" />
    </svg>
)

const MusicIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg className="mr-2" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
    </svg>
)

const InstagramIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
)

const TwitterIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
    </svg>
)

const FaceBookIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
)

const LeftArrowIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg
        width={`${width}`} height={`${height}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
    >
        <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const RightArrowIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg
        width={`${width}`} height={`${height}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
    >
        <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const DownArrowIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} className="-rotate-90" viewBox="0 0 24 24"><defs><path id="ic_navigation_goback-a" d="M16,22 C15.744,22 15.488,21.902 15.293,21.707 L6.293,12.707 C5.902,12.316 5.902,11.684 6.293,11.293 L15.293,2.293 C15.684,1.902 16.316,1.902 16.707,2.293 C17.098,2.684 17.098,3.316 16.707,3.707 L8.414,12 L16.707,20.293 C17.098,20.684 17.098,21.316 16.707,21.707 C16.512,21.902 16.256,22 16,22 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_navigation_goback-a" fill="currentColor"></use></g></svg>
)

const LockIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg
        width={`${width}`} height={`${height}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="ml-2 text-gray-400"
    >
        <path
            fillRule="evenodd"
            d="M12 2C9.79 2 8 3.79 8 6V9H6C4.9 9 4 9.9 4 11V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V11C20 9.9 19.1 9 18 9H16V6C16 3.79 14.21 2 12 2ZM10 6C10 4.9 10.9 4 12 4C13.1 4 14 4.9 14 6V9H10V6ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z"
        />
    </svg>
)

const QueueIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg
        width={`${width}`} height={`${height}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-list-music"
    >
        <path d="M21 15V6" />
        <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        <path d="M12 12H3" />
        <path d="M16 6H3" />
        <path d="M12 18H3" />
    </svg>
)

const ExpandIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_action_maximize-a" d="M16.939,18.354 L15.146,20.147 C15.014,20.279 14.966,20.475 15.023,20.653 C15.08,20.831 15.232,20.963 15.417,20.993 L21.417,21.993 C21.575,22.018 21.738,21.968 21.853,21.853 C21.967,21.739 22.018,21.576 21.993,21.417 L20.993,15.417 C20.962,15.232 20.831,15.08 20.653,15.023 C20.474,14.966 20.279,15.013 20.147,15.146 L18.354,16.939 L7.06,5.646 L8.853,3.853 C8.985,3.721 9.033,3.525 8.976,3.347 C8.919,3.169 8.767,3.037 8.582,3.007 L2.582,2.007 C2.423,1.981 2.26,2.032 2.146,2.147 C2.032,2.261 1.981,2.424 2.006,2.583 L3.006,8.583 C3.037,8.768 3.168,8.92 3.346,8.977 C3.525,9.034 3.72,8.987 3.852,8.854 L5.645,7.061 L16.939,18.354 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_maximize-a" fill="currentColor"></use></g></svg>
)

// SVG Icons
const IconSave = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17 21 17 13 7 13 7 21"></polyline>
        <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
);

const IconX = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const IconUser = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const IconCamera = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
        <circle cx="12" cy="13" r="4"></circle>
    </svg>
);

const IconMail = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const IconStar = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const IconGlobe = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

const IconZap = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

const IconCreditCard = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
);

const IconArrowUp = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
);

const IconLock = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const ClockIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const CompactIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-list-icon lucide-list"><path d="M3 12h.01" /><path d="M3 18h.01" /><path d="M3 6h.01" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M8 6h13" /></svg>
);

const ListIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-align-justify-icon lucide-align-justify"><path d="M3 12h18" /><path d="M3 18h18" /><path d="M3 6h18" /></svg>
);

const ThumbsUpIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24"><defs><path id="ic_action_like-a" d="M20.999,9 L17,9 L16.59,9 C15.87,9 15.42,8.24 15.77,7.61 L15.92,7.34 C16.46,6.35 16.77,5.24 16.72,4.12 C16.68,3.37 16.54,2.63 16.3,1.91 C16.12,1.37 15.61,1 15.04,1 C14.43,1 13.9,1.42 13.75,2.01 L13.39,3.45 C13.13,4.47 12.66,5.42 12,6.24 L9.71,9.12 C9.26,9.67 8.58,10 7.87,10 C7.39,10 7,10.39 7,10.87 L7,21 C7,21.55 7.45,22 8,22 L12.707,22 L16,22 L18.229,22 C19.107,22 19.882,21.427 20.141,20.588 L22.91,11.588 C23.306,10.302 22.344,9 20.999,9 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><path fill="currentColor" d="M5,23 L2,23 C1.448,23 1,22.552 1,22 L1,10 C1,9.448 1.448,9 2,9 L5,9 C5.552,9 6,9.448 6,10 L6,22 C6,22.552 5.552,23 5,23 Z" opacity=".5"></path><use href="#ic_action_like-a" fill="currentColor"></use></g></svg>
);

const SadIcon = ({ width = "24", height = "24" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-frown-icon lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
);


//close
export {
    HomeIcon,
    ExploreIcon,
    LibraryIcon,
    SearchIcon,
    AccountIcon,
    CrossIcon,
    PlayIcon,
    PauseIcon,
    PlusIcon,
    MoreIcon,
    BadgeIcon,
    HeartIcon,
    HeartIconFilled,
    PrevIcon,
    NextIcon,
    TwoLineIcon,
    SkipBackwardIcon,
    SkipForwardIcon,
    MuteIcon,
    VolumeIcon,
    DiscIcon,
    LoadingSpinnerIcon,
    UploadIcon,
    NonSelectIcon,
    SelectedIcon,
    MusicIcon,
    InstagramIcon,
    TwitterIcon,
    FaceBookIcon,
    LeftArrowIcon,
    RightArrowIcon,
    DownArrowIcon,
    LockIcon,
    QueueIcon,
    ExpandIcon,
    IconSave,
    IconX,
    IconUser,
    IconCamera,
    IconMail,
    IconStar,
    IconGlobe,
    IconZap,
    IconCreditCard,
    IconArrowUp,
    IconLock,
    ClockIcon,
    CompactIcon,
    ListIcon,
    ThumbsUpIcon,
    SadIcon
}