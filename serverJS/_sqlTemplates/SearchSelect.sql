SELECT
    DISTINCT id,
    name,
    desc_short,
    desc_long,
    img_obverse
FROM
    (
        SELECT
            1 AS rnk,
            id,
            country_id,
            material_id,
            category_id,
            quality,
            price,
            issue_year,
            name,
            desc_short,
            desc_long,
            img_obverse
        FROM
            coins
        WHERE
            name LIKE '%%'
        UNION
        SELECT
            2 AS rnk,
            id,
            country_id,
            material_id,
            category_id,
            quality,
            price,
            issue_year,
            name,
            desc_short,
            desc_long,
            img_obverse
        FROM
            coins
        WHERE
            desc_short LIKE '%%'
        UNION
        SELECT
            3 AS rnk,
            id,
            country_id,
            material_id,
            category_id,
            quality,
            price,
            issue_year,
            name,
            desc_short,
            desc_long,
            img_obverse
        FROM
            coins
        WHERE
            desc_long LIKE '%%'
    ) tab
WHERE
    country_id = 8
    AND material_id = 2
    AND category_id = 3
    AND quality = "BU"
    AND price > 50
    AND price < 100
    AND issue_year > 1900
    AND issue_year < 2000
ORDER BY
    rnk