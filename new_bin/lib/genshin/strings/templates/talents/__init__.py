from ...template import Template

from .albedo import char_albedo  # noqa
from .alhaitham import char_alhaitham  # noqa
from .aloy import char_aloy  # noqa
from .amber import char_amber  # noqa
from .arataki_itto import char_arataki_itto  # noqa
from .arlecchino import char_arlecchino  # noqa
from .baizhu import char_baizhu  # noqa
from .barbara import char_barbara  # noqa
from .beidou import char_beidou  # noqa
from .bennett import char_bennett  # noqa
from .candace import char_candace  # noqa
from .charlotte import char_charlotte  # noqa
from .chasca import char_chasca  # noqa
from .chevreuse import char_chevreuse  # noqa
from .chiori import char_chiori  # noqa
from .chongyun import char_chongyun  # noqa
from .citlali import char_citlali  # noqa
from .clorinde import char_clorinde  # noqa
from .collei import char_collei  # noqa
from .cyno import char_cyno  # noqa
from .dahlia import char_dahlia  # noqa
from .dehya import char_dehya  # noqa
from .diluc import char_diluc  # noqa
from .diona import char_diona  # noqa
from .dori import char_dori  # noqa
from .emilie import char_emilie  # noqa
from .escoffier import char_escoffier # noqa
from .eula import char_eula  # noqa
from .faruzan import char_faruzan  # noqa
from .fischl import char_fischl  # noqa
from .freminet import char_freminet  # noqa
from .furina import char_furina  # noqa
from .gaming import char_gaming  # noqa
from .ganyu import char_ganyu  # noqa
from .gorou import char_gorou  # noqa
from .hu_tao import char_hu_tao  # noqa
from .iansan import char_iansan  # noqa
from .ifa import char_ifa # noqa
from .ineffa import char_ineffa # noqa
from .jean import char_jean  # noqa
from .kachina import char_kachina  # noqa
from .kaedehara_kazuha import char_kaedehara_kazuha  # noqa
from .kaeya import char_kaeya  # noqa
from .kamisato_ayaka import char_kamisato_ayaka  # noqa
from .kamisato_ayato import char_kamisato_ayato  # noqa
from .kaveh import char_kaveh  # noqa
from .keqing import char_keqing  # noqa
from .kinich import char_kinich  # noqa
from .kirara import char_kirara  # noqa
from .klee import char_klee  # noqa
from .kujou_sara import char_kujou_sara  # noqa
from .kuki_shinobu import char_kuki_shinobu  # noqa
from .lan_yan import char_lan_yan  # noqa
from .layla import char_layla  # noqa
from .lisa import char_lisa  # noqa
from .lynette import char_lynette  # noqa
from .lyney import char_lyney  # noqa
from .mavuika import char_mavuika  # noqa
from .mika import char_mika  # noqa
from .mizuki import char_mizuki  # noqa
from .mona import char_mona  # noqa
from .mualani import char_mualani  # noqa
from .navia import char_navia  # noqa
from .nahida import char_nahida  # noqa
from .neuvillette import char_neuvillette  # noqa
from .nilou import char_nilou  # noqa
from .ningguang import char_ningguang  # noqa
from .noelle import char_noelle  # noqa
from .ororon import char_ororon  # noqa
from .qiqi import char_qiqi  # noqa
from .raiden_shogun import char_raiden_shogun  # noqa
from .razor import char_razor  # noqa
from .rosaria import char_rosaria  # noqa
from .sangonomiya_kokomi import char_sangonomiya_kokomi  # noqa
from .sayu import char_sayu  # noqa
from .sethos import char_sethos  # noqa
from .shenhe import char_shenhe  # noqa
from .shikanoin_heizou import char_shikanoin_heizou  # noqa
from .sigewinne import char_sigewinne  # noqa
from .skirk import char_skirk  # noqa
from .sucrose import char_sucrose  # noqa
from .tartaglia import char_tartaglia  # noqa
from .thoma import char_thoma  # noqa
from .tighnari import char_tighnari  # noqa
from .traveler_hydro import char_traveler_hydro  # noqa
from .traveler_pyro import char_traveler_pyro  # noqa
# from .traveler import char_traveler  # noqa
from .varesa import char_varesa  # noqa
from .venti import char_venti  # noqa
from .wanderer import char_wanderer  # noqa
from .wriothesley import char_wriothesley  # noqa
from .xiangling import char_xiangling  # noqa
from .xianyun import char_xianyun  # noqa
from .xiao import char_xiao  # noqa
from .xilonen import char_xilonen  # noqa
from .xingqiu import char_xingqiu  # noqa
from .xinyan import char_xinyan  # noqa
from .yae_miko import char_yae_miko  # noqa
from .yanfei import char_yanfei  # noqa
from .yaoyao import char_yaoyao  # noqa
from .yelan import char_yelan  # noqa
from .yoimiya import char_yoimiya  # noqa
from .yumemizuki_mizuki import char_yumemizuki_mizuki  # noqa
from .yun_jin import char_yun_jin  # noqa
from .zhongli import char_zhongli  # noqa


templates = Template(
    patterns=[
        # (r'<color=\#99FFFFFF>([^<]*?)<\/color>', 'cryo{\\1}'),
        # (r'<color=\#FFE699FF>([^<]*?)<\/color>', 'geo{\\1}'),
        # (r'<color=\#FF9999FF>([^<]*?)<\/color>', 'pyro{\\1}'),
        # (r'<color=\#80C0FFFF>([^<]*?)<\/color>', 'hydro{\\1}'),
        # (r'<color=\#FFACFFFF>([^<]*?)<\/color>', 'electro{\\1}'),
        # (r'<color=\#80FFD7FF>([^<]*?)<\/color>', 'anemo{\\1}'),
        # (r'<color=\#99FF88FF>([^<]*?)<\/color>', '\\1'),
        (r'{LAYOUT_PC#(.*?)}', '\\1'),
        (r'{LAYOUT_\w+#.*?}', ''),
        (r'{LINK\#N(\d+)}<color=\#\w+>(.*?)<\/color>{/LINK}', 'skill{n\\1:\\2}'),
        (r'{LINK\#N(\d+)}<color style=\'color\:\#\w+;\'>(.*?)<\/color>{/LINK}', 'skill{n\\1:\\2}'),
        (r'{LINK\#N(\d+)}(.*?){/LINK}', 'skill{n\\1:\\2}'),
        (r'{LINK\#\w\d+}<color=\#\w+>(.*?)<\/color>{/LINK}', 'skill{\\1}'),
        (r'{LINK\#\w\d+}(.*?){/LINK}', '\\1'),
        (r"<color style='color:\#FFD780;'>([^<]*?)<\/color>", 'skill{\\1}'),
        (r'<color=\#FFD780FF>([^<]*?)<\/color>', 'skill{\\1}'),
        (r'<color=\#\w+>([^<]*?)<\/color>', '\\1'),
        (r"<color style='color:\#\w+;'>([^<]*?)<\/color>", '\\1'),
        (r'\\n', '<br>'),
        (r'{M#(.*?)}', '\\1'),
        (r'{F#(.*?)}', ''),
        (r'^#', ''),
    ]
)
