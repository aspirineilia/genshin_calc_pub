from lib.genshin.datafiles.artifacts import ArtifactData


items = ArtifactData().get_list_by_field('setId', 15037)
print(list(map(lambda i: i['id'], items)))
