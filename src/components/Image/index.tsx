import React from 'react'

import * as styles from './image.module.scss'

export interface IImageProps
    extends React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    > {}

const Image: React.FC<IImageProps> = ({ className, ...others }) => {
    return (
        <img
            className={[styles.defaultImage, className].join(' ')}
            {...others}
        />
    )
}

export default Image
