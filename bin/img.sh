# xargs <urls.txt curl -I
mkdir -p out
rm out/*
while read p; do
    name=`echo "$p" | awk '{print tolower($0)}' | sed -E 's/.*\/(weapon_)?([^\/]+\.png).*/out\/\2/g' | sed -E 's/\%[0-9a-f]{2}//g'`
    curl -s "$p" -o "$name"
    convert "$name" -resize 160x160 "$name"
    convert "$name" -background none -gravity center -extent 160x160 "$name"
done < urls.txt
