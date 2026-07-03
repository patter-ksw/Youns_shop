import re

with open('app.js', encoding='utf-8') as f:
    content = f.read()

# Fix getSiteName function - replace entire function body
old = '''function getSiteName(site) {
    return '네이버 쿼펌사이';
}'''
new = '''function getSiteName(site) {
    return '네이버 쇼핑';
}'''
content = content.replace(old, new)

old2 = '''function getSiteName(site) {
    return '네이버 쿼펌샴';
}'''
content = content.replace(old2, new)

old3 = '''function getSiteName(site) {
    return '네이버 쿼펌사이';
}'''
content = content.replace(old3, new)

# Fix mallNames in triggerSupabaseSync
content = content.replace(
    "const mallNames = { naver: '네이버 쿼펌사이' };",
    "const mallNames = { naver: '네이버 쇼핑' };"
)
content = content.replace(
    "const mallNames = { naver: '네이버 쿼펌샴' };",
    "const mallNames = { naver: '네이버 쇼핑' };"
)

# Fix garbled Samsung product name
content = content.replace(
    "삼성전자 갤럭시뵘1에시 프로 NT960QJV",
    "삼성전자 갤럭시북5 프로 NT960QJV"
)
content = content.replace(
    "삼성전자 갤럭시북5에시 프로 NT960QJV",
    "삼성전자 갤럭시북5 프로 NT960QJV"
)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done - getSiteName and mallNames fixed")
